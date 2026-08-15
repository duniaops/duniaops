#!/usr/bin/env python3
"""Serve the static site locally with Netlify-style clean HTML URLs."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SITE_ROOT = PROJECT_ROOT / "dist"


class CleanUrlRequestHandler(SimpleHTTPRequestHandler):
    site_root = DEFAULT_SITE_ROOT

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _rewrite_clean_url(self) -> bool:
        parsed = urlsplit(self.path)
        relative_path = unquote(parsed.path).strip("/")

        if not relative_path or Path(relative_path).suffix:
            return False

        html_candidate = self.site_root / f"{relative_path}.html"
        if not html_candidate.is_file():
            return False

        if parsed.path.endswith("/"):
            destination = f"/{relative_path}"
            if parsed.query:
                destination = f"{destination}?{parsed.query}"
            self.send_response(302)
            self.send_header("Location", destination)
            self.end_headers()
            return True

        self.path = urlunsplit(("", "", f"/{relative_path}.html", parsed.query, ""))
        return False

    def do_GET(self) -> None:  # noqa: N802 - inherited HTTP handler API
        if self._rewrite_clean_url():
            return
        super().do_GET()

    def do_HEAD(self) -> None:  # noqa: N802 - inherited HTTP handler API
        if self._rewrite_clean_url():
            return
        super().do_HEAD()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument(
        "--directory",
        default=str(DEFAULT_SITE_ROOT),
        help="built site directory to serve (default: %(default)s)",
    )
    args = parser.parse_args()

    site_root = Path(args.directory)
    if not site_root.is_absolute():
        site_root = PROJECT_ROOT / site_root
    site_root = site_root.resolve()
    if not site_root.is_dir():
        parser.error(f"site directory does not exist: {site_root}; run npm run build:site")

    CleanUrlRequestHandler.site_root = site_root
    handler = partial(CleanUrlRequestHandler, directory=site_root)
    server = ThreadingHTTPServer((args.host, args.port), handler)

    print(f"Serving {site_root} at http://{args.host}:{args.port}")
    print("Clean URLs such as /products/zoday are enabled.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
