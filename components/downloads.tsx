"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Installers are published as GitHub Releases in the public downloads repo.
const REPO = "webdevoliva123/bizora-downloads";
const BASE = `https://github.com/${REPO}/releases/latest/download`;

type OS = "windows" | "mac" | "linux";

const DOWNLOADS = [
  { id: "windows", name: "Windows", req: "Windows 10 or 11, 64-bit", file: "Bizora-windows-x64.exe" },
  { id: "mac", name: "macOS", req: "Apple Silicon (M1 or newer)", file: "Bizora-mac-arm64.dmg" },
  { id: "linux", name: "Linux", req: "64-bit. AppImage runs on most distros", file: "Bizora-linux-x64.AppImage" },
] as const;

const INSTALL: Record<OS, [string, string][]> = {
  windows: [
    ["Download the installer", "Save Bizora-windows-x64.exe and double-click it."],
    ["Allow it once", "If Windows says “Windows protected your PC”, choose More info, then Run anyway."],
    ["Install", "Pick a folder and click Install. Bizora opens when it finishes."],
  ],
  mac: [
    ["Download the disk image", "Save Bizora-mac-arm64.dmg and open it."],
    ["Drag to Applications", "Drag the Bizora icon onto the Applications folder."],
    ["Open it the first time", "Right-click Bizora in Applications, choose Open, then Open again. After that it opens normally."],
  ],
  linux: [
    ["Download the AppImage", "Save Bizora-linux-x64.AppImage anywhere you like."],
    ["Make it runnable", "Run chmod +x Bizora-linux-x64.AppImage in a terminal, or allow executing in the file’s properties."],
    ["Start it", "Double-click the file. On Ubuntu or Debian you can instead run sudo apt install ./Bizora-linux-x64.deb."],
  ],
};

function useOS(): OS {
  const [os, setOs] = useState<OS>("windows");
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|android/.test(ua)) return;
    if (ua.includes("win")) setOs("windows");
    else if (ua.includes("mac")) setOs("mac");
    else if (ua.includes("linux") || ua.includes("x11")) setOs("linux");
  }, []);
  return os;
}

function useVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setVersion(String(d.tag_name).replace(/^v/, "")))
      .catch(() => {});
  }, []);
  return version;
}

export function InstallTabs() {
  const os = useOS();
  return (
    <Tabs key={os} defaultValue={os}>
      <TabsList>
        {DOWNLOADS.map((d) => (
          <TabsTrigger key={d.id} value={d.id}>{d.name}</TabsTrigger>
        ))}
      </TabsList>
      {DOWNLOADS.map((d) => (
        <TabsContent key={d.id} value={d.id} className="grid gap-3">
          {INSTALL[d.id].map(([title, text], i) => (
            <Card key={title} className="py-4">
              <CardContent className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-0.5">{i + 1}</Badge>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function DownloadCards() {
  const os = useOS();
  const version = useVersion();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {DOWNLOADS.map((d) => (
        <Card key={d.id} className={cn(d.id === os && "ring-2 ring-primary")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {d.name}
              {d.id === os && <Badge>Your system</Badge>}
            </CardTitle>
            <CardDescription>{d.req}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <a href={`${BASE}/${d.file}`} className={buttonVariants({ size: "lg" })}>
              <Download /> Download
            </a>
            {d.id === "linux" && (
              <a href={`${BASE}/Bizora-linux-x64.deb`} className={buttonVariants({ variant: "outline" })}>
                Or the .deb for Ubuntu and Debian
              </a>
            )}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            {d.file}{version ? ` · version ${version}` : ""}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
