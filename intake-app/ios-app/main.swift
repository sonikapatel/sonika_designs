// intake: a native iOS shell around the HTML prototype.
// Loads web/index.html from the app bundle full-screen in a WKWebView, with no browser chrome.
import UIKit
import WebKit

final class WebViewController: UIViewController, WKNavigationDelegate {
    private var webView: WKWebView!

    override func loadView() {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default() // keeps the prototype's saved answers between launches
        webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false // avoid a white flash before the page paints
        webView.backgroundColor = UIColor(red: 0.984, green: 1, blue: 1, alpha: 1)
        webView.scrollView.contentInsetAdjustmentBehavior = .never // the page handles safe areas itself
        webView.scrollView.bounces = false
        webView.navigationDelegate = self
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "web") else { return }
        // `-hash <page>` (passed by `simctl launch`) opens a specific screen, e.g. -hash sample/dental/review.
        let args = ProcessInfo.processInfo.arguments
        var target = url
        if let i = args.firstIndex(of: "-hash"), i + 1 < args.count,
           let withHash = URL(string: url.absoluteString + "#" + args[i + 1]) {
            target = withHash
        }
        webView.loadFileURL(target, allowingReadAccessTo: url.deletingLastPathComponent())
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .darkContent }

    // Tapped web links open in Safari instead of replacing the app.
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if action.navigationType == .linkActivated, let url = action.request.url,
           url.scheme == "http" || url.scheme == "https" {
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }
}

final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = WebViewController()
        window?.makeKeyAndVisible()
        return true
    }
}

UIApplicationMain(CommandLine.argc, CommandLine.unsafeArgv, nil, NSStringFromClass(AppDelegate.self))
