#!/usr/bin/env swift
// Reuse the approved Barney artwork without redrawing the character.
import AppKit
import Foundation

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let game = ProcessInfo.processInfo.environment["ROCKIMALS_GAME_ROOT"].map {
    URL(fileURLWithPath: $0)
} ?? root.deletingLastPathComponent().appendingPathComponent("rockimals")
let output = root.appendingPathComponent("assets/rockimals-blog/meet-barney/cover.jpg")
let portrait = NSImage(contentsOf: game.appendingPathComponent("assets/animals/transparent/fox.webp"))!
let scene = NSImage(contentsOf: game.appendingPathComponent("assets/images/stories/fox_departure_v2/fox_departure_hill_v2_02.webp"))!
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
NSGradient(starting: NSColor(srgbRed: 0.025, green: 0.055, blue: 0.11, alpha: 1),
    ending: NSColor(srgbRed: 0.10, green: 0.18, blue: 0.27, alpha: 1))!
    .draw(in: NSRect(x: 0, y: 0, width: 1200, height: 630), angle: 25)
// A few subdued stars belong to the editorial background, not to an app UI.
for (x, y, r) in [(45.0, 570.0, 2.0), (530, 575, 2), (565, 80, 1.5), (75, 55, 1.5), (1160, 580, 2)] {
    NSColor(srgbRed: 1, green: 0.80, blue: 0.54, alpha: 0.75).setFill()
    NSBezierPath(ovalIn: NSRect(x: x, y: y, width: r * 2, height: r * 2)).fill()
}
portrait.draw(in: NSRect(x: 30, y: 45, width: 540, height: 540), from: .zero,
    operation: .sourceOver, fraction: 1)
// Retain the full width and the top 980 px: all subjects, with no quiet text area.
let frame = NSRect(x: 605, y: 26, width: 502, height: 578)
NSGraphicsContext.saveGraphicsState()
NSBezierPath(roundedRect: frame, xRadius: 24, yRadius: 24).addClip()
scene.draw(in: frame,
    from: NSRect(x: 0, y: scene.size.height - 980, width: scene.size.width, height: 980),
    operation: .sourceOver, fraction: 1)
NSGraphicsContext.restoreGraphicsState()
NSColor(srgbRed: 1, green: 0.70, blue: 0.38, alpha: 0.65).setStroke()
let border = NSBezierPath(roundedRect: frame, xRadius: 24, yRadius: 24)
border.lineWidth = 2
border.stroke()
NSGraphicsContext.restoreGraphicsState()
try FileManager.default.createDirectory(at: output.deletingLastPathComponent(), withIntermediateDirectories: true)
try bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.88])!.write(to: output)
print(output.path)
