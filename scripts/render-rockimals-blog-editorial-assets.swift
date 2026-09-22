#!/usr/bin/env swift

import AppKit
import Foundation

let fileManager = FileManager.default
let siteRoot = URL(fileURLWithPath: fileManager.currentDirectoryPath, isDirectory: true)
let defaultGameRoot = siteRoot.deletingLastPathComponent().appendingPathComponent("rockimals", isDirectory: true)
let gameRoot = ProcessInfo.processInfo.environment["ROCKIMALS_GAME_ROOT"].map {
    URL(fileURLWithPath: $0, isDirectory: true)
} ?? defaultGameRoot
let outputRoot = siteRoot.appendingPathComponent("assets/rockimals-blog", isDirectory: true)

let canvasSize = NSSize(width: 1200, height: 630)

enum RenderError: Error, CustomStringConvertible {
    case missingImage(String)
    case encodingFailed(String)

    var description: String {
        switch self {
        case .missingImage(let path): return "Could not load source image: \(path)"
        case .encodingFailed(let path): return "Could not encode JPEG output: \(path)"
        }
    }
}

func loadImage(_ url: URL) throws -> NSImage {
    guard let image = NSImage(contentsOf: url) else {
        throw RenderError.missingImage(url.path)
    }
    return image
}

func imageRect(for image: NSImage, inside target: NSRect) -> NSRect {
    let scale = min(target.width / image.size.width, target.height / image.size.height)
    let width = image.size.width * scale
    let height = image.size.height * scale
    return NSRect(
        x: target.midX - width / 2,
        y: target.midY - height / 2,
        width: width,
        height: height
    )
}

func drawImage(_ image: NSImage, inside target: NSRect, opacity: CGFloat = 1) {
    image.draw(
        in: imageRect(for: image, inside: target),
        from: .zero,
        operation: .sourceOver,
        fraction: opacity,
        respectFlipped: true,
        hints: [.interpolation: NSImageInterpolation.high]
    )
}

func drawGradient(_ colors: [NSColor], angle: CGFloat = 0) {
    NSGradient(colors: colors)?.draw(in: NSRect(origin: .zero, size: canvasSize), angle: angle)
}

func drawStars(_ points: [(CGFloat, CGFloat, CGFloat)], color: NSColor = .white) {
    for (x, y, radius) in points {
        color.withAlphaComponent(radius > 3 ? 0.9 : 0.55).setFill()
        NSBezierPath(ovalIn: NSRect(x: x - radius, y: y - radius, width: radius * 2, height: radius * 2)).fill()
    }
}

func drawRadarRings(center: NSPoint, radii: [CGFloat], color: NSColor) {
    color.setStroke()
    for radius in radii {
        let path = NSBezierPath(ovalIn: NSRect(
            x: center.x - radius,
            y: center.y - radius,
            width: radius * 2,
            height: radius * 2
        ))
        path.lineWidth = 3
        path.stroke()
    }
    let beam = NSBezierPath()
    beam.move(to: center)
    beam.line(to: NSPoint(x: center.x + 280, y: center.y + 110))
    beam.lineWidth = 4
    beam.stroke()
}

func drawShield(in rect: NSRect, color: NSColor) {
    let path = NSBezierPath()
    path.move(to: NSPoint(x: rect.midX, y: rect.maxY))
    path.curve(
        to: NSPoint(x: rect.minX, y: rect.midY + 25),
        controlPoint1: NSPoint(x: rect.midX - 70, y: rect.maxY - 20),
        controlPoint2: NSPoint(x: rect.minX + 8, y: rect.maxY - 38)
    )
    path.curve(
        to: NSPoint(x: rect.midX, y: rect.minY),
        controlPoint1: NSPoint(x: rect.minX + 4, y: rect.midY - 100),
        controlPoint2: NSPoint(x: rect.midX - 65, y: rect.minY + 25)
    )
    path.curve(
        to: NSPoint(x: rect.maxX, y: rect.midY + 25),
        controlPoint1: NSPoint(x: rect.midX + 65, y: rect.minY + 25),
        controlPoint2: NSPoint(x: rect.maxX - 4, y: rect.midY - 100)
    )
    path.curve(
        to: NSPoint(x: rect.midX, y: rect.maxY),
        controlPoint1: NSPoint(x: rect.maxX - 8, y: rect.maxY - 38),
        controlPoint2: NSPoint(x: rect.midX + 70, y: rect.maxY - 20)
    )
    path.close()
    color.withAlphaComponent(0.18).setFill()
    path.fill()
    color.setStroke()
    path.lineWidth = 10
    path.stroke()

    let shackle = NSBezierPath(roundedRect: NSRect(x: rect.midX - 43, y: rect.midY + 5, width: 86, height: 80), xRadius: 42, yRadius: 42)
    shackle.lineWidth = 10
    shackle.stroke()
    color.setFill()
    NSBezierPath(roundedRect: NSRect(x: rect.midX - 58, y: rect.midY - 58, width: 116, height: 92), xRadius: 18, yRadius: 18).fill()
    NSColor(calibratedWhite: 0.1, alpha: 0.85).setFill()
    NSBezierPath(ovalIn: NSRect(x: rect.midX - 8, y: rect.midY - 22, width: 16, height: 16)).fill()
}

func renderCover(output: URL, draw: () throws -> Void) throws {
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: Int(canvasSize.width),
        pixelsHigh: Int(canvasSize.height),
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bitmapFormat: [],
        bytesPerRow: 0,
        bitsPerPixel: 0
    ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
        throw RenderError.encodingFailed(output.path)
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    NSGraphicsContext.current?.imageInterpolation = .high
    try draw()
    context.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()

    guard
        let data = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.88])
    else {
        throw RenderError.encodingFailed(output.path)
    }

    try fileManager.createDirectory(at: output.deletingLastPathComponent(), withIntermediateDirectories: true)
    try data.write(to: output, options: .atomic)
}

let mouse = try loadImage(gameRoot.appendingPathComponent("assets/animals/transparent/mouse.webp"))
let whale = try loadImage(gameRoot.appendingPathComponent("assets/animals/transparent/whale.webp"))
let fox = try loadImage(gameRoot.appendingPathComponent("assets/animals/transparent/fox.webp"))
let bear = try loadImage(gameRoot.appendingPathComponent("assets/animals/transparent/bear.webp"))

let stars: [(CGFloat, CGFloat, CGFloat)] = [
    (62, 72, 2), (115, 510, 4), (184, 290, 2), (260, 575, 2),
    (340, 110, 3), (430, 495, 2), (535, 560, 4), (655, 90, 2),
    (735, 520, 3), (820, 175, 2), (920, 575, 2), (1010, 390, 4),
    (1115, 535, 3), (1160, 115, 2), (965, 70, 2), (585, 305, 2)
]

try renderCover(output: outputRoot.appendingPathComponent("rockimals-getting-started/cover.jpg")) {
    drawGradient([
        NSColor(calibratedRed: 0.025, green: 0.065, blue: 0.13, alpha: 1),
        NSColor(calibratedRed: 0.08, green: 0.17, blue: 0.33, alpha: 1)
    ], angle: -18)
    drawStars(stars)
    drawRadarRings(
        center: NSPoint(x: 585, y: 315),
        radii: [95, 190, 285],
        color: NSColor(calibratedRed: 1, green: 0.42, blue: 0.16, alpha: 0.42)
    )
    drawImage(mouse, inside: NSRect(x: 55, y: 82, width: 390, height: 390))
    drawImage(whale, inside: NSRect(x: 760, y: 135, width: 390, height: 390))
}

try renderCover(output: outputRoot.appendingPathComponent("what-is-an-asteroid-for-kids/cover.jpg")) {
    drawGradient([
        NSColor(calibratedRed: 0.035, green: 0.08, blue: 0.16, alpha: 1),
        NSColor(calibratedRed: 0.24, green: 0.075, blue: 0.17, alpha: 1)
    ], angle: 22)
    drawStars(stars.reversed())
    NSColor(calibratedRed: 1, green: 0.69, blue: 0.38, alpha: 0.38).setStroke()
    let orbit = NSBezierPath(ovalIn: NSRect(x: 210, y: 105, width: 780, height: 420))
    orbit.lineWidth = 4
    orbit.stroke()
    drawImage(mouse, inside: NSRect(x: 90, y: 125, width: 250, height: 250))
    drawImage(whale, inside: NSRect(x: 615, y: 65, width: 510, height: 510))
    NSColor(calibratedRed: 1, green: 0.69, blue: 0.38, alpha: 0.75).setStroke()
    let measure = NSBezierPath()
    measure.move(to: NSPoint(x: 300, y: 90))
    measure.line(to: NSPoint(x: 925, y: 90))
    measure.lineWidth = 5
    measure.stroke()
}

try renderCover(output: outputRoot.appendingPathComponent("rockimals-parent-controls/cover.jpg")) {
    drawGradient([
        NSColor(calibratedRed: 0.025, green: 0.06, blue: 0.12, alpha: 1),
        NSColor(calibratedRed: 0.07, green: 0.19, blue: 0.25, alpha: 1)
    ], angle: -10)
    drawStars(stars)
    drawImage(fox, inside: NSRect(x: 30, y: 65, width: 390, height: 390), opacity: 0.94)
    drawImage(bear, inside: NSRect(x: 790, y: 65, width: 380, height: 380), opacity: 0.94)
    drawShield(
        in: NSRect(x: 455, y: 105, width: 290, height: 410),
        color: NSColor(calibratedRed: 1, green: 0.42, blue: 0.16, alpha: 0.95)
    )
}

print("Rendered three Rockimals editorial covers in \(outputRoot.path)")
