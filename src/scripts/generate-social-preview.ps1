# Gera a imagem horizontal usada nos metadados de compartilhamento.
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$portraitPath = Join-Path $root 'assets/images/euchico-perfil.jpg'
$outputPath = Join-Path $root 'assets/images/social-preview.png'
$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$portrait = [System.Drawing.Image]::FromFile($portraitPath)
$background = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#181714'))
$foreground = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#f0ede8'))
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#b1aba3'))
$accent = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#dfae4a'))
$border = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#dfae4a'), 5)
$brandFont = [System.Drawing.Font]::new('Georgia', 29, [System.Drawing.FontStyle]::Italic)
$nameFont = [System.Drawing.Font]::new('Georgia', 66, [System.Drawing.FontStyle]::Regular)
$subtitleFont = [System.Drawing.Font]::new('Georgia', 28, [System.Drawing.FontStyle]::Italic)
$smallFont = [System.Drawing.Font]::new('Consolas', 19, [System.Drawing.FontStyle]::Regular)
$clip = [System.Drawing.Drawing2D.GraphicsPath]::new()

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.FillRectangle($background, 0, 0, 1200, 630)
  $graphics.FillRectangle($accent, 76, 106, 64, 4)
  $graphics.DrawString('fp', $brandFont, $foreground, 76, 35)
  $graphics.DrawString('Francisco', $nameFont, $foreground, 70, 150)
  $graphics.DrawString('de Paula', $nameFont, $foreground, 70, 235)
  $graphics.DrawString('Programador Full Stack', $subtitleFont, $muted, 76, 355)
  $graphics.DrawString('.NET | Angular | Dados | ERP', $subtitleFont, $muted, 76, 400)
  $graphics.DrawString('EUCHICO.GITHUB.IO', $smallFont, $accent, 77, 542)

  $clip.AddEllipse(780, 135, 350, 350)
  $graphics.SetClip($clip)
  $graphics.DrawImage($portrait, 780, 135, 350, 350)
  $graphics.ResetClip()
  $graphics.DrawEllipse($border, 780, 135, 350, 350)
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $clip.Dispose()
  $smallFont.Dispose()
  $subtitleFont.Dispose()
  $nameFont.Dispose()
  $brandFont.Dispose()
  $border.Dispose()
  $accent.Dispose()
  $muted.Dispose()
  $foreground.Dispose()
  $background.Dispose()
  $portrait.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}
