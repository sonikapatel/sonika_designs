// Renders the app icon: a teal "i" and the red "n" from the intake wordmark on a snow-to-mist ground.
// Usage: swift make-icon.swift <out.png> <pixels>
import AppKit

let out = CommandLine.arguments[1]
let size = CGFloat(Double(CommandLine.arguments[2])!)
let cs = CGColorSpaceCreateDeviceRGB()
let ctx = CGContext(data: nil, width: Int(size), height: Int(size), bitsPerComponent: 8, bytesPerRow: 0,
                    space: cs, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!

let ground = CGGradient(colorsSpace: cs, colors: [CGColor(red: 0.984, green: 1, blue: 1, alpha: 1),
                                                  CGColor(red: 0.835, green: 1, blue: 1, alpha: 1)] as CFArray,
                        locations: [0, 1])!
ctx.drawLinearGradient(ground, start: CGPoint(x: 0, y: size), end: .zero, options: [])

// Switch to the wordmark's y-down units (glyphs span x 0…49, y 2…65) and center them.
ctx.translateBy(x: 0, y: size); ctx.scaleBy(x: 1, y: -1)
let s = size * 0.5 / 62
ctx.translateBy(x: size / 2 - 24.5 * s, y: size / 2 - 33.5 * s)
ctx.scaleBy(x: s, y: s)
ctx.setLineCap(.round); ctx.setLineJoin(.round); ctx.setLineWidth(9)

let teal = CGColor(red: 0.173, green: 0.455, blue: 0.463, alpha: 1)
let red = CGColor(red: 0.698, green: 0.106, blue: 0.114, alpha: 1)

ctx.setStrokeColor(teal)
ctx.move(to: CGPoint(x: 5, y: 60)); ctx.addLine(to: CGPoint(x: 5, y: 26)); ctx.strokePath()
ctx.setFillColor(teal)
ctx.fillEllipse(in: CGRect(x: -0.5, y: 2.5, width: 11, height: 11))

ctx.setStrokeColor(red)
ctx.move(to: CGPoint(x: 20, y: 60)); ctx.addLine(to: CGPoint(x: 20, y: 34))
ctx.addCurve(to: CGPoint(x: 32, y: 22), control1: CGPoint(x: 20, y: 26), control2: CGPoint(x: 25, y: 22))
ctx.addCurve(to: CGPoint(x: 44, y: 34), control1: CGPoint(x: 39, y: 22), control2: CGPoint(x: 44, y: 26))
ctx.addLine(to: CGPoint(x: 44, y: 60))
ctx.strokePath()

let rep = NSBitmapImageRep(cgImage: ctx.makeImage()!)
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
