# Site owner setup — what we need from you

Three short tasks, all free, about 20 minutes total. Each one ends with a value to send back.

## Context

The website is moving to GitHub Pages (free hosting, no monthly cost). Three things change:

- **Contact form** — now sends inquiries straight to your email via Web3Forms instead of storing
  them on a server
- **Visitor analytics** — moves to a proper analytics service you log into, replacing the on-site
  dashboard (which was showing partly placeholder numbers)
- **AI career assistant** — paused for now. The code is kept and can be switched back on later; it
  needs a paid-capable host to keep the Gemini API key secret.

---

## Task 1 — Web3Forms access key (required, ~5 min)

Powers the "Send a Direct Message" form. Free plan covers 250 submissions/month.

1. Go to **https://web3forms.com**
2. In the "Create your Access Key" box on the homepage, enter the email address where you want
   inquiries delivered
3. Click **Create Access Key**
4. Open that inbox and click the verification link
5. Web3Forms shows/emails you an **access key** — a long ID like
   `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Send back:** the access key, and confirmation of which email address should receive inquiries.

> The current site lists `asemalhamady92@yahoo.com`. If you would rather recruiters reach a
> different address, this is the moment to switch — the form delivers wherever you point it.

---

## Task 2 — Analytics (required, pick one, ~5–10 min)

Choose **A** or **B**, not both.

### Option A — Cloudflare Web Analytics *(recommended)*

Free, unlimited, no cookies, so no cookie-consent banner is needed on the site.

1. Sign up free at **https://dash.cloudflare.com/sign-up** (no credit card, and you do **not**
   need to move your domain to Cloudflare)
2. In the left sidebar choose **Analytics & Logs → Web Analytics**
3. Click **Add a site**
4. Enter the hostname: `asemhammadi.github.io`
5. Cloudflare generates a snippet containing a **token** — a long hex string inside
   `data-cf-beacon='{"token": "..."}'`

**Send back:** the token (or just paste the whole snippet).

### Option B — Google Analytics 4

Free and more detailed, but it sets cookies — which means the site legally needs a cookie-consent
banner for EU/UK visitors. Extra work, and a banner on the landing page.

1. Go to **https://analytics.google.com** and sign in with a Google account
2. **Admin** (gear icon) → **Create** → **Property**
3. Enter a property name (e.g. "Asem Portfolio"), timezone, and currency
4. Answer the business-details questions
5. Under **Choose a platform**, pick **Web**
6. Enter the website URL and a stream name
7. The **Measurement ID** appears in the stream details — format `G-XXXXXXXXXX`

**Send back:** the Measurement ID.

---

## Task 3 — GitHub access (required, ~5 min)

The site lives at **github.com/Asemhammadi/my-website**, which you own. Deployment needs three
settings changed. Either invite us as a collaborator and we'll do it, or do it yourself.

**To invite us:** repo → **Settings → Collaborators → Add people** → grant **Write** access.

**To do it yourself:**

1. **Settings → General**: confirm the repo is **Public** (free GitHub Pages requires it)
2. **Settings → Pages → Source**: select **GitHub Actions**
3. **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `VITE_WEB3FORMS_KEY`
   - Value: the access key from Task 1

**Send back:** confirmation these are done, or a collaborator invite.

---

## Summary — what to send back

| # | Item | Looks like |
| --- | --- | --- |
| 1 | Web3Forms access key | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| 2 | Destination email for inquiries | `you@example.com` |
| 3 | Analytics token **or** Measurement ID | `abc123...` / `G-XXXXXXXXXX` |
| 4 | GitHub collaborator invite, or confirmation of the three settings | — |

## Cost

Everything above is free at this scale: GitHub Pages hosting, Web3Forms (250 submissions/month),
Cloudflare Web Analytics (unlimited), Google Analytics (unlimited). The only optional paid item is
a custom domain — roughly $10–15/year — if you would prefer `asemalhammadi.com` over
`asemhammadi.github.io/my-website`. Worth considering for a portfolio recruiters will see.

## If items are delayed

The site still deploys. Without a Web3Forms key the contact form shows a message directing
visitors to email and call directly, rather than failing silently. Without an analytics ID, no
tracking runs. Both can be added later without a rebuild of the site.
