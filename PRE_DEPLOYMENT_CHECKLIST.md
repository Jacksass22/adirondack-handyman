# Pre-Deployment Checklist

## Files Created ✅
- [x] `netlify.toml` - Netlify configuration
- [x] `.env.example` - Environment variable template
- [x] `DEPLOYMENT.md` - Full deployment guide

## Pre-Deployment Verification

### 1. Local Build Test ✅
```bash
npm run build
```
Status: **PASSED** - Build completed successfully

### 2. Environment Variables
- [x] `.env.local` exists (not committed to git)
- [x] `.env.example` created as template
- [x] Webhook URL configured: `https://internal.defiantintegration.com/webhook/adirondack-chat`

### 3. n8n Workflows
Before deploying, ensure these are working:

#### Chat Webhook
- [ ] n8n workflow is **ACTIVE**
- [ ] Memory node connected to AI Agent
- [ ] Test message returns proper response
- [ ] CORS headers configured in "Send Response" node

Test command:
```bash
curl -X POST https://internal.defiantintegration.com/webhook/adirondack-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","session_id":"test123"}'
```

Expected response:
```json
{
  "success": true,
  "response": "...",
  "lead_captured": false
}
```

#### Quote Form Webhook
- [ ] n8n workflow exists for `adirondack-quote`
- [ ] Webhook is active and responding
- [ ] Email notification working (if configured)

### 4. Git Repository
```bash
# Check git status
git status

# Stage all files
git add .

# Commit
git commit -m "Prepare for Netlify deployment"

# Push to GitHub
git push origin main
```

### 5. Netlify Account
- [ ] Netlify account created at https://app.netlify.com
- [ ] GitHub connected to Netlify

## Ready to Deploy?

If all checks above are complete:

1. Follow instructions in `DEPLOYMENT.md`
2. Deploy via Netlify UI (easiest) or CLI
3. Add environment variable in Netlify dashboard
4. Test the live site

## Post-Deployment Testing

After deployment, test:
- [ ] Homepage loads
- [ ] Chat widget appears (bottom right)
- [ ] Chat widget responds to messages
- [ ] Quote form submits successfully
- [ ] All navigation links work
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic)

## Troubleshooting

If something doesn't work after deployment:

1. **Check Netlify build logs** - Look for errors
2. **Check browser console** - Look for JavaScript errors
3. **Test webhooks directly** - Use curl commands above
4. **Verify environment variables** - In Netlify dashboard
5. **Check n8n execution logs** - See if webhooks are being called

## Quick Fixes

### Chat not responding
- Check browser console for webhook URL
- Verify environment variable in Netlify
- Test n8n webhook directly

### Form not submitting
- Check network tab in browser dev tools
- Verify webhook URL in `src/app/quote/page.tsx:118`
- Check n8n execution logs

## Support

Need help? Check:
- `DEPLOYMENT.md` - Full deployment guide
- Netlify docs: https://docs.netlify.com
- n8n docs: https://docs.n8n.io
