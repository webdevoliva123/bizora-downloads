import Image from "next/image";
import { ChartNoAxesColumn, ClipboardList, Package, Receipt, Users, Wallet, Zap } from "lucide-react";

import { DownloadCards, InstallTabs } from "@/components/downloads";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  { icon: Receipt, title: "Billing", text: "Invoices with numbering, tax and discounts. Print them or save as PDF, with your bank details and payment QR on every bill." },
  { icon: ClipboardList, title: "Daily entries", text: "Pick a customer, add products and quantities, mark it paid or unpaid. Each entry joins the customer’s history." },
  { icon: Zap, title: "Quick sale", text: "Counter sale to someone you don’t know? Enter the amount and payment method. Done." },
  { icon: Users, title: "Customers and suppliers", text: "People and businesses, with transaction history and outstanding balances." },
  { icon: Package, title: "Stock and purchases", text: "Record what you buy from suppliers and watch stock update. Purchases stay separate from expenses." },
  { icon: Wallet, title: "Expenses and workers", text: "Rent, electricity, transport and worker payments, each tracked in its own place." },
  { icon: ChartNoAxesColumn, title: "Reports", text: "Daily and monthly sales, outstanding payments, revenue against costs, and a profit overview." },
];

const FLOW = [
  ["First launch", "Bizora creates its own private database on your computer. There is nothing else to install and no account to make."],
  ["Set up your business", "Enter your business name, country, tax and licence details, and payment details. You do this once, and it takes a few minutes."],
  ["Land on your dashboard", "From then on Bizora opens straight to the dashboard. It only shows the setup screen if setup was never finished."],
  ["Add customers and products", "Enter your regulars, your products with units and prices, and your opening stock."],
  ["Record each day", "Add a daily entry or a quick sale. Every entry can become a bill you print or save as PDF."],
  ["Check your reports", "See daily and monthly sales, who still owes you, and your profit."],
];

const FAQ = [
  ["Why is there a warning the first time I open it?", "Bizora is new and is not yet signed with a paid developer certificate, so Windows and macOS show a one-time warning for any app like that. The install steps above get you past it."],
  ["Where is my data stored?", "In a folder in your user profile: ~/Library/Application Support/bizora on macOS, %APPDATA%\\bizora on Windows, and ~/.config/bizora on Linux. Copy that folder to back up your records."],
  ["How do I update Bizora?", "Download the newest installer and install it over the old one. Your data stays in the folder above."],
  ["Does it need internet?", "Only to download the installer. After that Bizora works offline."],
  ["Which businesses is it for?", "It was built first for dairy shops and works for bakeries, cafés, groceries and other small businesses."],
];

const INVOICE = [["Milk", "50 L", "₹3,000"], ["Paneer", "20 kg", "₹7,000"], ["Curd", "30 kg", "₹2,000"]];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top"><Image src="/platform-assets/logo.png" alt="Bizora" width={710} height={211} className="h-10 w-auto" priority /></a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#features" className="hidden text-muted-foreground hover:text-foreground sm:inline">Features</a>
            <a href="#how" className="hidden text-muted-foreground hover:text-foreground sm:inline">How it works</a>
            <a href="#install" className="hidden text-muted-foreground hover:text-foreground sm:inline">Install guide</a>
            <a href="#download" className={buttonVariants({ size: "sm" })}>Download</a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl space-y-24 px-4 py-16">
        <section className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary">Windows · macOS · Linux</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Run your shop. Skip the server.</h1>
            <p className="text-lg text-muted-foreground">
              Bizora is billing and business management that lives on your own computer. Invoices, customers,
              stock, expenses and reports, with no hosting bill and no internet needed.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#download" className={buttonVariants({ size: "lg" })}>Download Bizora</a>
              <a href="#install" className={buttonVariants({ size: "lg", variant: "outline" })}>Read the install guide</a>
            </div>
          </div>
          <Card className="mx-auto w-full max-w-md" aria-label="Sample Bizora invoice">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Image src="/platform-assets/mark.png" alt="" width={214} height={211} className="h-7 w-auto" />
                  Invoice #0142
                </span>
                <Badge>Paid</Badge>
              </CardTitle>
              <CardDescription>ABC Foods · 15 September 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {INVOICE.map(([name, qty, amount]) => (
                <div key={name} className="flex justify-between border-b pb-2">
                  <span>{name} <span className="text-muted-foreground">{qty}</span></span>
                  <span>{amount}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-base font-semibold"><span>Total</span><span>₹12,000</span></div>
            </CardContent>
          </Card>
        </section>

        <section id="features" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Everything a small business does in a day</h2>
            <p className="text-muted-foreground">Simple enough for a bakery, café or grocery, and built first for dairy shops.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-6 text-primary" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="how" className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your data stays on your computer</CardTitle>
              <CardDescription>
                Bizora keeps everything in a local database. There is no monthly hosting cost, core features work
                without internet, and your records open fast and stay fully under your control.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Made for your country</CardTitle>
              <CardDescription>
                Tax and licence details are set up by you, not hard-coded. Use GST and GSTIN in India, GST in New
                Zealand, and add FSSAI or any other registration your authority requires.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section id="install" className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Before you download: how it works, start to finish</h2>
            <p className="text-muted-foreground">Two minutes of reading now saves you surprises later.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. Install it on your computer</h3>
            <InstallTabs />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. What happens after that</h3>
            <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {FLOW.map(([title, text], i) => (
                <li key={title}>
                  <Card className="h-full">
                    <CardHeader>
                      <Badge variant="outline">Step {i + 1}</Badge>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{text}</CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. Good to know</h3>
            <Accordion type="single" collapsible>
              {FAQ.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="download" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Download Bizora</h2>
            <p className="text-muted-foreground">
              Choose your system. A security warning on first open is normal; the <a href="#install" className="underline">install guide</a> shows how to continue.
              Bizora is in active development, so keep regular backups of your business data.
            </p>
          </div>
          <DownloadCards />
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <Image src="/platform-assets/logo.png" alt="Bizora" width={710} height={211} className="h-8 w-auto" />
          <span>Your business, simplified.</span>
        </div>
      </footer>
    </>
  );
}
