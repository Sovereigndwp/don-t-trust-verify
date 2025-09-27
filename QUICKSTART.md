# ⚡ Quick Start - Learn Bitcoin By Doing

## 🚀 Launch in 30 Seconds

### Step 1: Start Your MCP Agent Kit
```bash
cd /Users/dalia/projects/btc-mcp-agent
npm start
```
✅ Runs on http://localhost:8080

### Step 2: Start Your Website
```bash
cd /Users/dalia/projects/website
python3 -m http.server 8001
```
✅ Runs on http://localhost:8001

### Step 3: Open in Browser
🌐 **Navigate to:** http://localhost:8001

---

## 🎯 What You'll See

### 🏠 Homepage
- **Live Bitcoin Dashboard** showing real-time network data
- **Current BTC Price** with 24h change indicator
- **Network Status** indicator (green = connected to MCP)
- **Interactive buttons** to start learning

### 📚 Learning Modules
- **Bitcoin Fundamentals** - Start here if new to Bitcoin
- **Transaction Mechanics** - Learn how Bitcoin transactions work
- **Security & Custody** - Essential wallet security

### 🎮 Simulations
- **Transaction Builder** - Build a Bitcoin transaction
- **Fee Calculator** - Calculate optimal fees
- **Security Trainer** - Practice security scenarios

### 🤖 AI Features
- **Generate Course** - Create personalized courses on-demand
- **Intelligence Dashboard** - Real-time Bitcoin insights
- **Interactive Tools** - Address validator, unit converter, etc.

---

## 🧪 Test Everything Works

### 1️⃣ Check MCP Connection
Look for green status indicator in header
- 🟢 Green = Connected to MCP Agent Kit
- 🔴 Red = Using fallback mode

### 2️⃣ Test Live Data
Dashboard should show:
- Current block height (e.g., "800,000+")
- Bitcoin price (e.g., "$40,000+")
- Fee estimate (e.g., "15-25 sats/vB")

### 3️⃣ Try a Simulation
1. Click "Explore Simulations"
2. Click "Launch Simulator" on any card
3. Interact with the simulation

### 4️⃣ Generate an AI Course
1. Scroll to "AI-Generated Courses"
2. Select topic (e.g., "Lightning Network")
3. Select level (e.g., "Beginner")
4. Click "Generate New Course"

### 5️⃣ Use a Tool
1. Scroll to "Interactive Bitcoin Tools"
2. In Address Validator, enter: `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`
3. Click "Validate"
4. See ✅ Valid address result

---

## 📱 Mobile Test

### Open on Phone
1. Find your computer's IP: 
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
2. On your phone, navigate to: `http://[YOUR-IP]:8001`
3. Test mobile menu (hamburger icon)
4. Check responsive layout

---

## 🔥 Pro Tips

### Enable Auto-Refresh
Data updates automatically every 60 seconds

### Keyboard Shortcuts
- `ESC` - Close any modal
- Click outside modal to close

### Best Experience
- Use Chrome, Firefox, Safari, or Edge
- Enable JavaScript
- Allow local storage for progress saving (future feature)

---

## 🆘 Troubleshooting

### "MCP Agent Kit not available"
- Ensure MCP Agent Kit is running on port 8080
- Check terminal for any errors
- Website will use fallback data if disconnected

### Port Already in Use
Try different ports:
```bash
python3 -m http.server 8002  # or 8003, 8004, etc.
```

### No Data Showing
- Wait 2-3 seconds for initial load
- Check browser console for errors (F12)
- Refresh page (Cmd+R or Ctrl+R)

---

## 🎉 Enjoy Your Bitcoin Education Platform!

You now have a powerful, AI-driven Bitcoin education website that:
- ✅ Teaches through interactive experiences
- ✅ Uses real Bitcoin network data
- ✅ Generates personalized courses
- ✅ Monitors Bitcoin intelligence
- ✅ Works beautifully on all devices

**Happy Learning! 🚀₿**