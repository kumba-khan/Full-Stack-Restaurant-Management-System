# AUTH ROUTES

# POST http://localhost:4000/auth/register

Body (JSON):
{
"name": "John Doe",
"email": "john@gmail.com",
"password": "12345"
}

# POST http://localhost:4000/auth/login

Body:
{
"email": "john@gmail.com",
"password": "12345"
}
Copy the returned token for all protected routes.

# MENU ROUTES

# POST http://localhost:4000/menu

Headers:
Authorization: Bearer <token>
Body:
{
"title": "Lunch Menu",
"items": [
{ "name": "Burger", "price": 8 },
{ "name": "Pizza", "price": 12 }
]
}

# GET http://localhost:4000/menu

# PATCH http://localhost:4000/menu/<menuId>

Headers: token
Body:
{
"title": "Updated Menu Title"
}

# DELETE http://localhost:4000/menu/<menuId>

Headers: token

# ORDER ROUTES

# POST http://localhost:4000/orders

Headers: token
Body:
{
"customerName": "Alice",
"items": [
{ "name": "Burger", "price": 8, "quantity": 2 },
{ "name": "Pizza", "price": 12, "quantity": 1 }
]
}

# GET http://localhost:4000/orders

Headers: token

# DELETE http://localhost:4000/orders/<orderId>

Headers: token

//add food item

# 3️⃣ Test in Postman

# Method: PATCH

# URL: http://localhost:4000/menu/<menu_id>/add-item

Body: JSON with name and price of the new food item.
