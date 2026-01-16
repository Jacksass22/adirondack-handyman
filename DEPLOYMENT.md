# Deploying Adirondack Handyman to Netlify

## Prerequisites
- GitHub account
- Netlify account (free tier works)
- Your code pushed to GitHub

## Step 1: Push to GitHub

If you haven't already, push your code:

```bash
cd adirondack-handyman
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. **Go to Netlify**: https://app.netlify.com
2. **Click "Add new site"** → "Import an existing project"
3. **Connect to GitHub** and select your `adirondack-handyman` repository
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - (These are auto-detected from netlify.toml)
5. **Add environment variables**:
   - Click "Show advanced"
   - Add: `NEXT_PUBLIC_CHAT_WEBHOOK_URL` = `https://internal.defiantintegration.com/webhook/adirondack-chat`
6. **Click "Deploy site"**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd adirondack-handyman
netlify deploy --prod
```

## Step 3: Configure Environment Variables

After deployment, set environment variables in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add:
   - Key: `NEXT_PUBLIC_CHAT_WEBHOOK_URL`
   - Value: `https://internal.defiantintegration.com/webhook/adirondack-chat`
3. **Redeploy** the site for changes to take effect

## Step 4: Configure Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `adirondackhandyman.com`)
4. Follow DNS configuration instructions
5. Netlify will auto-provision SSL certificate

## Step 5: Update n8n Webhooks for CORS

Your n8n webhooks need to accept requests from your Netlify domain.

The `Send Response` node already has CORS headers configured:
```json
{
  "Access-Control-Allow-Origin": "*"
}
```

If you want to restrict to your domain only, change `*` to your Netlify URL.

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify all dependencies are in package.json
- Ensure Node version is 20+ (set in netlify.toml)

### Environment Variables Not Working
- Make sure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing variables
- Check browser console for the webhook URL

### Chatbot Not Working
- Check browser console for CORS errors
- Verify n8n webhook is accessible publicly
- Test webhook directly: `curl https://internal.defiantintegration.com/webhook/adirondack-chat`

### Form Submissions Failing
- Verify the webhook URL in quote/page.tsx (line 118)
- Check n8n workflow is active
- Review n8n execution logs

## Post-Deployment Checklist

- [ ] Site loads at Netlify URL
- [ ] Chat widget appears and responds
- [ ] Quote form submits successfully
- [ ] All pages render correctly
- [ ] Mobile responsive
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)

## Continuous Deployment

Netlify automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Netlify will build and deploy automatically within 2-3 minutes.

## Support

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js/

## Project URLs

- **Production URL**: (Will be assigned by Netlify)
- **n8n Chat Webhook**: https://internal.defiantintegration.com/webhook/adirondack-chat
- **n8n Quote Webhook**: https://internal.defiantintegration.com/webhook/adirondack-quote
