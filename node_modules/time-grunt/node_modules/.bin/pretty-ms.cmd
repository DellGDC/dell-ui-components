@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\pretty-ms\cli.js" %*
) ELSE (
  node  "%~dp0\..\pretty-ms\cli.js" %*
)