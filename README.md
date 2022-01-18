# OrderHistoryDashboard
* Front End: React.js
* Middle-Tier: .NetCore/C#
* Back End: Microsoft SQL Server

# Summary
The order history dashboard contains the following: 
A dashboard table that lists orders placed by the logged in user. This table is ordered by date modified, showing the most recently updated ordr first. Per order it lists the customer's name, order number, date updated, date placed, tracking number and url, order status, and the cost of the order in USD.
Actions available to the user are the ability to change the page size to 5, 10, or 15 and utilize the pagination implemented at the bottom of the dashboard.

# Components
* OrderHistoryCard.jsx as a Function component using props
* OrderHistoryDash.jsx as a Class component

# Axios
* userProfileService.js contains the GET orderHistory, which paginates all orders placed by the currently logged in user.


# .NET
* UserOrder.cs is a Model
* UserOrderService.cs is the Service
* IUserOrderService.cs is the Interface
* UserOrderApiController is the API Controller
