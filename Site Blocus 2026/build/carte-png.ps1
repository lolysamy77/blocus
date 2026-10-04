# Rastérise build/carte.json en PNG pour vérifier le rendu sans navigateur.
#   powershell -File build/carte-png.ps1 [-Out build/carte.png] [-Width 1400]
param(
  [string]$Out = "build\carte.png",
  [int]$Width = 1400
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root 'build\carte.json'
$out  = Join-Path $root $Out

$data = Get-Content -Raw -Encoding UTF8 $src | ConvertFrom-Json

$scale = $Width / $data.viewW
$Height = [int]($data.viewH * $scale)

$bmp = New-Object System.Drawing.Bitmap($Width, $Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear([System.Drawing.Color]::White)

$fill   = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 248, 250, 252))
$line   = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 148, 163, 184)), ([single]($data.stroke * $scale))
$line.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$line.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$line.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
$numBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 17, 24, 39))
$haloBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$fontCache = @{}

foreach ($d in $data.depts) {
  # pts = [x0,y0, x1,y1, ...] en unités viewBox
  $pts = $d.pts
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.StartFigure()
  $n = $pts.Count / 2
  $prevX = $null; $prevY = $null
  for ($i = 0; $i -lt $n; $i += 3) {          # on saute 1 point sur 3 : suffisant à cette échelle
    $x = [single]($pts[$i * 2] * $scale)
    $y = [single]($pts[$i * 2 + 1] * $scale)
    if ($null -ne $prevX) { $path.AddLine($prevX, $prevY, $x, $y) }
    $prevX = $x; $prevY = $y
  }
  $path.AddLine($prevX, $prevY, [single]($pts[0] * $scale), [single]($pts[1] * $scale))
  $path.CloseFigure()

  $g.FillPath($fill, $path)
  $g.DrawPath($line, $path)
  $path.Dispose()
}

# numéros de département
$fam = New-Object System.Drawing.FontFamily('Arial')
foreach ($d in $data.depts) {
  $key = [string]$d.fs
  if (-not $fontCache.ContainsKey($key)) {
    $fontCache[$key] = New-Object System.Drawing.Font($fam, [single]($d.fs * $scale), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  }
  $font = $fontCache[$key]
  $cx = [single]($d.lx * $scale)
  $cy = [single]($d.ly * $scale)
  $sz = $g.MeasureString($d.code, $font)
  $x = $cx - $sz.Width / 2
  $y = $cy - $sz.Height / 2
  $pad = [single]($d.fs * $scale * 0.22)
  $g.FillRectangle($haloBrush, $x - $pad, $y - $pad, $sz.Width + 2 * $pad, $sz.Height + 2 * $pad)
  $g.DrawString($d.code, $font, $numBrush, $x, $y)
}

$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "$out  ($Width x $Height)"