# Add a Morph transition (fade fallback) to every slide of a pptx, in place
import sys, zipfile, re, shutil, os
src = sys.argv[1]; tmp = src + ".tmp"
TR = ('<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">'
      '<mc:Choice xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/09/main" '
      'xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" Requires="p159">'
      '<p:transition spd="slow" p14:dur="1000"><p159:morph option="byObject"/></p:transition></mc:Choice>'
      '<mc:Fallback><p:transition spd="slow"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>')
n = 0
with zipfile.ZipFile(src) as zi, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        data = zi.read(it.filename)
        if re.match(r"ppt/slides/slide\d+\.xml$", it.filename):
            x = data.decode("utf8")
            assert "<p:transition" not in x
            if "</p:clrMapOvr>" in x: x = x.replace("</p:clrMapOvr>", "</p:clrMapOvr>" + TR, 1)
            else: x = x.replace("</p:cSld>", "</p:cSld>" + TR, 1)
            data = x.encode("utf8"); n += 1
        zo.writestr(it, data)
shutil.move(tmp, src); print("morph added to", n, "slides")
