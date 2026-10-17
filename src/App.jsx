import { useEffect, useState } from "react";

/* ---- Edit these: installers are published to the public downloads repo ---- */
const VERSION = "0.1.0"; // replaced by the latest release tag when the page loads
const REPO = "webdevoliva123/bizora-downloads";
const BASE = `https://github.com/${REPO}/releases/latest/download`;
const ASSETS = import.meta.env.BASE_URL + "platform-assets/";
const DOWNLOADS = [
  { id: "windows", name: "Windows", req: "Windows 10 or 11, 64-bit", file: "Bizora-windows-x64.exe", url: `${BASE}/Bizora-windows-x64.exe` },
  { id: "mac", name: "macOS", req: "Apple Silicon (M1 or newer)", file: "Bizora-mac-arm64.dmg", url: `${BASE}/Bizora-mac-arm64.dmg` },
  { id: "linux", name: "Linux", req: "64-bit. AppImage for any distro", file: "Bizora-linux-x64.AppImage", url: `${BASE}/Bizora-linux-x64.AppImage`,
    alt: { label: "or .deb for Ubuntu and Debian", url: `${BASE}/Bizora-linux-x64.deb` } },
];

const INSTALL = {
  windows: [
    ["Download the installer", "Save Bizora-windows-x64.exe and double-click it."],
    ["Allow it once", "If Windows says “Windows protected your PC”, choose More info, then Run anyway."],
    ["Install", "Pick a folder, click Install, and Bizora opens when it finishes."],
  ],
  mac: [
    ["Download the disk image", "Save Bizora-mac-arm64.dmg and open it."],
    ["Drag to Applications", "Drag the Bizora icon onto the Applications folder."],
    ["Open it the first time", "Right-click Bizora in Applications, choose Open, then Open again. After that it opens normally."],
  ],
  linux: [
    ["Download the AppImage", "Save Bizora-linux-x64.AppImage anywhere you like."],
    ["Make it runnable", "In a terminal run chmod +x Bizora-linux-x64.AppImage, or allow executing in the file’s properties."],
    ["Start it", "Double-click the file. On Ubuntu or Debian you can instead run sudo apt install ./Bizora-linux-x64.deb."],
  ],
};

const FLOW = [
  ["First launch", "Bizora creates its own private database on your computer. There is nothing else to install and no account to make."],
  ["Set up your business", "Enter your business name, country, tax and licence details, and payment details. You do this once, and it takes a few minutes."],
  ["Land on your dashboard", "From then on, Bizora opens straight to the dashboard. It only shows the setup screen again if setup was never finished."],
  ["Add customers and products", "Enter your regulars, your products with units and prices, and your opening stock."],
  ["Record each day", "Add a daily entry or a quick sale. Every entry can become a bill you print or save as PDF."],
  ["Check your reports", "See daily and monthly sales, who still owes you, and your profit."],
];

const GOOD_TO_KNOW = [
  ["Why is there a warning on first open?", "Bizora is new and is not yet signed with a paid developer certificate, so Windows and macOS show a one-time warning for any such app. The steps above get you past it."],
  ["Where is my data stored?", "In a folder in your user profile: macOS ~/Library/Application Support/bizora, Windows %APPDATA%\\bizora, Linux ~/.config/bizora. Copy that folder to back up your records."],
  ["How do I update?", "Download the newest installer and install it over the old one. Your data stays in the folder above."],
  ["Does it need internet?", "Only to download the installer. After that Bizora works offline."],
];

const FEATURES = [
  ["Billing", "Invoices with numbering, tax and discounts. Print them or save as PDF, with your bank details and payment QR on every bill."],
  ["Daily entries", "Pick a customer, add products and quantities, set paid or unpaid. Each entry joins the customer's history."],
  ["Quick Sale", "Counter sale to someone you don't know? Enter the amount and payment method. Done."],
  ["Customers and suppliers", "People and businesses, with transaction history and outstanding balances."],
  ["Stock and purchases", "Record what you buy from suppliers and watch stock update. Purchases stay separate from expenses."],
  ["Expenses and workers", "Rent, electricity, transport and worker payments, each tracked in its own place."],
  ["Reports", "Daily and monthly sales, outstanding payments, revenue against costs, and a profit overview."],
];

const STEPS = [
  ["Install Bizora", "Download the installer for your computer and run it. No terminal, no server."],
  ["Set up your business", "Choose your country, then add tax, licence and payment details."],
  ["Add customers and products", "Enter your regulars, your products, units, prices and opening stock."],
  ["Start billing", "Record sales, send invoices, track who has paid."],
];

function detectOS() {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|android/.test(ua)) return "windows";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return "windows";
}

function Invoice() {
  const rows = [["Milk", "50 L", "3,000"], ["Paneer", "20 kg", "7,000"], ["Curd", "30 kg", "2,000"]];
  return (
    <div className="invoice" role="img" aria-label="Sample Bizora invoice">
      <div className="inv-head">
        <span className="inv-title"><img src={ASSETS + "mark.png"} alt="" />Invoice #0142</span>
        <span className="badge">Paid</span>
      </div>
      <p className="inv-to">ABC Foods · 15 September 2026</p>
      <table>
        <tbody>
          {rows.map(([n, q, a]) => (
            <tr key={n}><td>{n}</td><td>{q}</td><td>₹{a}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="inv-total"><span>Total</span><strong>₹12,000</strong></div>
      <div className="inv-pay">
        <div className="qr" aria-hidden="true" />
        <p>Scan to pay<br />or use the bank details printed on the bill</p>
      </div>
    </div>
  );
}

export default function App() {
  const [os, setOs] = useState("windows");
  const [tab, setTab] = useState("windows");
  const [version, setVersion] = useState(VERSION);
  useEffect(() => { const d = detectOS(); setOs(d); setTab(d); }, []);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setVersion(String(d.tag_name).replace(/^v/, "")))
      .catch(() => {});
  }, []);
  const main = DOWNLOADS.find((d) => d.id === os);

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand" aria-label="Bizora home"><img src={ASSETS + "logo.png"} alt="Bizora" /></a>
        <nav aria-label="Main">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#flow">Install guide</a>
          <a href="#local">Local-first</a>
          <a href="#download" className="btn small">Download</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div>
            <h1>Run your shop. Skip the server.</h1>
            <p className="lead">
              Bizora is billing and business management that lives on your own computer.
              Invoices, customers, stock, expenses and reports, with no hosting bill and no
              internet needed.
            </p>
            <div className="cta">
              <a className="btn" href="#download">Download for {main.name}</a>
              <a className="btn ghost" href="#features">See what it does</a>
            </div>
            <p className="note">Free to try · Version {version} · Windows, macOS and Linux</p>
          </div>
          <Invoice />
        </section>

        <section id="features" className="wrap section">
          <h2>Everything a small business does in a day</h2>
          <p className="sub">Built first for dairy shops, simple enough for bakeries, cafés, groceries and other small businesses.</p>
          <dl className="features">
            {FEATURES.map(([t, d]) => (
              <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </section>

        <section id="how" className="band">
          <div className="wrap section">
            <h2>From install to first invoice</h2>
            <ol className="steps">
              {STEPS.map(([t, d], i) => (
                <li key={t}><span className="n">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="local" className="wrap section two">
          <div>
            <h2>Your data stays on your computer</h2>
            <p>
              Bizora stores everything in a local database. There is no monthly hosting cost,
              core features work without internet, and your records are fast to open and
              fully under your control.
            </p>
            <p>
              Updates never replace your business data. Before any database change, Bizora
              makes a safety backup. You can also back up, restore and export whenever you like.
            </p>
          </div>
          <div>
            <h2>Made for your country</h2>
            <p>
              Tax and licence details are configurable, not hard-coded. Use GST and GSTIN in
              India, GST in New Zealand, and add FSSAI or any other registration your
              authority requires.
            </p>
            <p>Your invoices show the terms you know, in the way your customers expect.</p>
          </div>
        </section>

        <section id="flow" className="wrap section">
          <h2>Before you download: how it works, start to finish</h2>
          <p className="sub">Two minutes of reading now saves you surprises later.</p>

          <h3 className="flow-h">1. Install it on your computer</h3>
          <div className="tabs" role="tablist" aria-label="Choose your system">
            {DOWNLOADS.map((d) => (
              <button key={d.id} role="tab" aria-selected={tab === d.id} className={tab === d.id ? "on" : ""} onClick={() => setTab(d.id)}>{d.name}</button>
            ))}
          </div>
          <ol className="install">
            {INSTALL[tab].map(([t, d], i) => (
              <li key={t}><span className="n">{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>
            ))}
          </ol>

          <h3 className="flow-h">2. What happens after that</h3>
          <ol className="flow">
            {FLOW.map(([t, d]) => (
              <li key={t}><h4>{t}</h4><p>{d}</p></li>
            ))}
          </ol>

          <h3 className="flow-h">3. Good to know</h3>
          <div className="faq">
            {GOOD_TO_KNOW.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <section id="download" className="download">
          <div className="wrap section">
            <h2>Download Bizora</h2>
            <p className="sub">Choose your system. We've highlighted the one you're on.</p>
            <div className="os-grid">
              {DOWNLOADS.map((d) => (
                <article key={d.id} className={"os" + (d.id === os ? " current" : "")}>
                  <h3>{d.name}</h3>
                  <p>{d.req}</p>
                  <a className="btn" href={d.url} download>Download {d.file}</a>
                  {d.alt && <a className="alt" href={d.alt.url} download>{d.alt.label}</a>}
                  <small>Version {version}</small>
                </article>
              ))}
            </div>
            <p className="note">
              Seeing a security warning on first open is normal. <a href="#flow">Here is how to get past it.</a>
              {" "}Bizora is in active development, so features may change between versions.
              Keep regular backups of your business data.
            </p>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <img src={ASSETS + "logo.png"} alt="Bizora" className="foot-logo" />
        <span>Your business, simplified. © {new Date().getFullYear()} Bizora</span>
      </footer>
    </>
  );
}
