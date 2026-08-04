#!/usr/bin/env python3
"""Local preview server for the site.

Use this instead of `python -m http.server`.

Plain http.server lets the browser cache HTML, CSS and JS, which makes edits
look as though they had no effect - you end up looking at an old stylesheet
without realising it. This sends no-store on everything, so a normal refresh
always shows the current files.

    python serve.py            # http://localhost:8000
    python serve.py 8001       # a different port

Development only. It is not used to host the site.
"""

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Quieter than the default: only report anything that isn't a 200
        if not str(args[1] if len(args) > 1 else "").startswith("2"):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Serving on http://localhost:{port}  (caching disabled)")
    print("Press Ctrl+C to stop.")
    try:
        ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
