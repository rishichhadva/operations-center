# Screen Recording Script - Operations Center

**Duration: 1-2 minutes**

---

## Script

### Introduction (0:00 - 0:15)

"Hi! I'm Rishi, and today I'll walk you through Operations Center - a role-based e-commerce operations portal I built.

This is a fully functional internal operations management system with three user roles, four core workflows, and persistent state management."

**[Show login page]**

"Let me start by selecting a role - I'll choose Operations Manager to demonstrate the full feature set."

**[Click on Manager role, then "Continue to Portal"]**

---

### Dashboard Overview (0:15 - 0:30)

"Here's the dashboard with real-time metrics. Notice how payment data is only visible to Managers and Admins - this demonstrates our role-based access control.

The dashboard aggregates data from all modules and updates in real-time."

**[Point to different stat cards]**

---

### Merchant Onboarding (0:30 - 0:45)

"Let's look at Merchant Onboarding. I can see all merchant applications with their statuses.

**[Click on Merchants in sidebar]**

"As a Manager, I can review, approve, or reject applications. Watch - I'll approve this merchant."

**[Click Approve button]**

"Notice the status changes immediately, and it's saved to localStorage. If I make a mistake, I can use the Undo button to revert."

**[Show Undo button]**

---

### Payment Reconciliation (0:45 - 1:00)

"Payment Reconciliation is restricted to Managers and Admins only. Let me reconcile a payment."

**[Click on Payments in sidebar]**

"I'll settle this pending payment. The action is tracked with my name and persisted across sessions."

**[Click Settle button]**

"If an Agent tried to access this page, they'd be redirected to the dashboard - that's our protected route system working."

---

### Support Tickets (1:00 - 1:15)

"Support Tickets are available to all roles. I can assign tickets to myself, resolve them, or close them."

**[Click on Tickets in sidebar]**

"Let me assign this open ticket to myself - notice how the status automatically changes to 'in progress'."

**[Click "Assign to Me"]**

---

### Technical Highlights (1:15 - 1:30)

"Key technical features:

- **Persistent State**: All changes save to localStorage and sync across browser tabs
- **Undo System**: Every action can be reverted with full history tracking
- **Role-Based Access**: Granular permissions enforced at the route and component level
- **Modern Stack**: Built with React, TypeScript, TailwindCSS, and shadcn-ui components"

**[Show code or highlight UI elements]**

---

### Closing (1:30 - 1:45)

"This portal demonstrates clean architecture, thoughtful UX design, and robust state management.

All code is available on GitHub, and the README includes detailed component documentation.

Thanks for watching!"

---

## Visual Guide for Recording

### Screen Recording Flow:

1. **Start Screen**: Login page
   - Show the three role options
   - Explain role-based access

2. **Select Role**: Click "Operations Manager"
   - Explain why Manager role (full access)

3. **Dashboard** (5-10 seconds)
   - Point to metrics
   - Mention role-based visibility

4. **Merchants** (15-20 seconds)
   - Show table
   - Click "Approve" on a pending merchant
   - Show status change
   - Point to Undo button

5. **Payments** (15-20 seconds)
   - Show payment table
   - Click "Settle" on a pending payment
   - Explain role restriction

6. **Tickets** (10-15 seconds)
   - Show ticket table
   - Click "Assign to Me"
   - Show status change

7. **Technical Highlights** (10-15 seconds)
   - Show code or explain features
   - Mention localStorage, undo, etc.

8. **Closing** (5 seconds)
   - Thank you message

---

## Key Points to Emphasize

✅ **Role-Based Access Control** - Show how different roles see different features
✅ **Persistent State** - Mention localStorage and cross-tab sync
✅ **Undo Functionality** - Demonstrate the undo button
✅ **Clean UI/UX** - Professional design and intuitive navigation
✅ **Real-Time Updates** - Show how changes reflect immediately

---

## Tips for Recording

1. **Speak clearly** and at a moderate pace
2. **Use cursor highlights** to point to important elements
3. **Pause briefly** after actions to show results
4. **Keep it concise** - aim for 1.5-2 minutes total
5. **Show, don't just tell** - demonstrate features visually
6. **Test the flow** before recording to ensure smooth transitions

---

## Alternative Shorter Script (1 minute)

### Quick Demo Script:

"Hi! This is Operations Center - a role-based e-commerce operations portal.

**[Login as Manager]**

"The dashboard shows real-time metrics with role-based visibility.

**[Go to Merchants]**

"I can approve merchants, and all changes persist with undo support.

**[Go to Payments]**

"Payment reconciliation is restricted to Managers and Admins.

**[Go to Tickets]**

"Support tickets are available to all roles with full workflow management.

Key features: persistent state via localStorage, undo system, role-based access, and real-time sync across tabs.

Built with React, TypeScript, and TailwindCSS. Check out the GitHub repo for the full implementation!"

---

## Recording Checklist

- [ ] Test all features work before recording
- [ ] Clear browser cache/localStorage for clean demo
- [ ] Have browser zoom at 100% for best quality
- [ ] Close unnecessary tabs/applications
- [ ] Use screen recording tool (Loom, OBS, QuickTime, etc.)
- [ ] Record in 1080p or higher
- [ ] Test audio levels
- [ ] Practice the flow once before final recording

---

**Good luck with your recording! 🎥**

