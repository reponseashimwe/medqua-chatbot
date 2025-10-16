# 🚀 Render Deployment Guide

## ✅ Pre-Deployment Checklist

Your project is now ready to deploy! Here's what's configured:

-   ✅ CPU-only model loading (no GPU dependencies)
-   ✅ FastAPI with OpenAPI docs
-   ✅ CORS enabled for frontend
-   ✅ Environment variable support
-   ✅ Procfile for Render
-   ✅ Python dependencies optimized

## 📝 Step-by-Step Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create Render Account

-   Go to [https://render.com](https://render.com)
-   Sign up with GitHub (recommended)

### 3. Deploy Backend API

#### A. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure settings:

| Setting            | Value                                     |
| ------------------ | ----------------------------------------- |
| **Name**           | `healthcare-chatbot-api` (or your choice) |
| **Region**         | Choose closest to you                     |
| **Branch**         | `main`                                    |
| **Root Directory** | `api`                                     |
| **Runtime**        | `Python 3`                                |
| **Build Command**  | `pip install -r requirements.txt`         |
| **Start Command**  | Leave empty (uses Procfile)               |
| **Instance Type**  | Free (for testing) or Starter ($7/mo)     |

#### B. Add Environment Variables

Click **"Environment"** tab and add:

| Key        | Value                                                                           |
| ---------- | ------------------------------------------------------------------------------- |
| `MODEL_ID` | `reponseashimwe/healthcare-chatbot`                                             |
| `HF_TOKEN` | Your Hugging Face token ([get it here](https://huggingface.co/settings/tokens)) |

#### C. Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. First deploy takes longer (downloads model: ~440MB)

### 4. Test Your Deployment

Once deployed, you'll get a URL like: `https://healthcare-chatbot-api.onrender.com`

#### Test Swagger Docs:

```
https://healthcare-chatbot-api.onrender.com/docs
```

#### Test Health Endpoint:

```
https://healthcare-chatbot-api.onrender.com/health
```

#### Test with curl:

```bash
curl -X POST "https://healthcare-chatbot-api.onrender.com/api/chat/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "history": [],
    "new_message": "What are the symptoms of diabetes?"
  }'
```

### 5. Deploy Frontend (Optional)

#### Vercel Deployment:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Settings:
    - **Framework:** Next.js
    - **Root Directory:** `web`
    - **Build Command:** `npm run build`
    - **Environment Variable:**
        - `NEXT_PUBLIC_API_URL` = `https://healthcare-chatbot-api.onrender.com`
4. Click **Deploy**

## 🔧 Render Configuration Details

### Instance Types

**Free Tier:**

-   ✅ 750 hours/month free
-   ⚠️ Spins down after 15 min inactivity
-   ⚠️ Cold start: ~30 seconds
-   ⚠️ Limited to 512MB RAM (tight for this model)
-   💡 Good for: Testing, demos

**Starter ($7/month):**

-   ✅ Always on (no spin down)
-   ✅ 512MB RAM
-   ✅ Faster cold starts
-   💡 Good for: Personal projects, low traffic

**Standard ($25/month):**

-   ✅ 2GB RAM (recommended for this model)
-   ✅ Better performance
-   ✅ Production ready
-   💡 Good for: Production, higher traffic

### Performance Expectations

| Metric         | Free Tier | Starter | Standard |
| -------------- | --------- | ------- | -------- |
| **First Load** | 3-5 min   | 2-3 min | 2-3 min  |
| **Cold Start** | ~30s      | ~20s    | ~15s     |
| **Inference**  | 2-4s      | 1-3s    | 1-2s     |
| **Concurrent** | 1-2       | 3-5     | 10+      |

## 🐛 Troubleshooting

### Issue: "Application failed to start"

**Check the logs:**

1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab

**Common causes:**

-   Missing environment variables (`HF_TOKEN`, `MODEL_ID`)
-   Wrong `HF_TOKEN` (get a new one)
-   Model download timeout (wait longer, retry)

### Issue: "Out of memory"

**Solution:** Upgrade from Free to Starter or Standard tier.

The model needs ~1.5GB RAM to load comfortably.

### Issue: "502 Bad Gateway"

**This is normal!** The app is still loading the model.

-   First deploy: Wait 3-5 minutes
-   Check `/health` endpoint to see if model loaded
-   Look at logs for progress

### Issue: "Service unavailable after inactivity"

**On Free tier:** Service spins down after 15 min.

-   First request after spin-down takes 30-40 seconds
-   **Solution:** Upgrade to Starter ($7/mo) for always-on

### Issue: Model takes too long to load

**Optimization tips:**

1. Use Starter or Standard tier (more RAM)
2. Model caches after first load
3. Subsequent deployments are faster
4. Consider Docker with pre-downloaded model (advanced)

## 📊 Monitoring

### Health Check Endpoints

| Endpoint      | Purpose                         |
| ------------- | ------------------------------- |
| `GET /`       | Basic health check              |
| `GET /health` | Detailed status (model loaded?) |
| `GET /docs`   | Interactive API documentation   |

### Render Dashboard

Monitor in real-time:

-   CPU usage
-   Memory usage
-   Request logs
-   Error logs
-   Response times

## 🔐 Security Best Practices

1. **Environment Variables**

    - Never commit `.env` files
    - Use Render's environment variables
    - Rotate `HF_TOKEN` periodically

2. **CORS Configuration**

    - In production, update `allow_origins` in `app.py`:

    ```python
    allow_origins=["https://your-frontend.vercel.app"]
    ```

3. **Rate Limiting** (Optional)
    - Add rate limiting for public APIs
    - Prevent abuse and control costs

## 🚀 Next Steps After Deployment

1. **Test thoroughly:**

    - Use `/docs` interactive UI
    - Try various medical questions
    - Test with conversation history
    - Check response times

2. **Monitor logs:**

    - Watch for errors
    - Check model loading time
    - Monitor memory usage

3. **Deploy frontend:**

    - Update `NEXT_PUBLIC_API_URL`
    - Deploy to Vercel
    - Test end-to-end

4. **Optional improvements:**
    - Add rate limiting
    - Add caching for common questions
    - Add analytics
    - Custom domain

## 📞 Support

-   **Render Docs:** https://render.com/docs
-   **Render Community:** https://community.render.com
-   **FastAPI Docs:** https://fastapi.tiangolo.com
-   **Transformers Docs:** https://huggingface.co/docs/transformers

## ✅ Final Checklist

Before going live:

-   [ ] Code pushed to GitHub
-   [ ] Render service created
-   [ ] Environment variables set (`MODEL_ID`, `HF_TOKEN`)
-   [ ] Deployment successful
-   [ ] `/health` endpoint returns healthy
-   [ ] `/docs` accessible
-   [ ] Test chat endpoint works
-   [ ] Frontend deployed (if applicable)
-   [ ] Frontend connects to backend
-   [ ] End-to-end test passed

---

**Your API is ready to deploy to Render!** 🎉

Just push to GitHub and follow the steps above.
