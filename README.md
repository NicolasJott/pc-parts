# PC Parts Monorepo
by Nicolas Ott

### PC Parts project scaffold
- [PC Parts API](https://github.com/NicolasJott/pc-parts/blob/main/pc-parts-api/README.md) - A PHP Laravel MySQL API. 
- [PC Parts APP](https://github.com/NicolasJott/pc-parts/blob/main/pc-parts-app/README.md) - A vite app with a slew of features.

### PC Parts API

- Using the Larevel framework was an easy decision as it lays out a solid foundation for using PHP and MySQL for a fully functional backend.

The PC Parts API makes use of PHP and MySQL to handle the following:
- User account creation
- CRUD operations for Orders
- CRUD operations for Products
- CRUD operations for Carts 

#### Databse Schemas

**User**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2022-08-27T16:14:46.000000Z"
}
```

**Cart**
```json
{
  "id": 1,
  "user_id": 1,
  "session_id": "12345",
  "total": 100,
  "cartItems": [
    {
      "id": 1,
      "quantity": 1,
      "cart_id": 1,
      "product_id": 1
    }
  ]
}
```

**CartItem**
```json
{
  "id": 1,
  "quantity": 1,
  "cart_id": 1,
  "product_id": 1
}
```

**Order**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "123-456-7890",
  "created_at": "2022-08-27T16:14:46.000000Z",
  "deliveryAddress": {
    "address1": "123 Easy Street",
    "address2": "Apt. 309",
    "city": "Youngstown",
    "state": "OH",
    "zipCode": 123456
  },
  "lineItems": [
      {
        "id": 1,
        "quantity": 1,
        "product": {
          "id": 1,
          "name": "AMD - Ryzen 7 7800X3D 8-Core - 16-Thread 4.2 GHz (5.0 GHz Max Boost) Socket AM5 Unlocked Desktop Processor - Black",
          "model": "100-100000910WOF",
          "price": 369,
          "category": "CPU",
          "product_image": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6537/6537139cv11d.jpg;maxHeight=200;maxWidth=300",
          "description": "AMD Ryzen 7 7800X3D The dominant gaming processor with AMD 3D V-Cache technology for even more game performance.  Whatever the setting, whatever the resolution, lead your team to victory with this incredible gaming processor.  Plus, enjoy the benefits of next-gen AMD 3D V-Cache technology for lower latency and even more game performance. ",
          "specifications": [
            "Socket AM5 (LGA 1718)",
            "4.2 gigahertz",
            "5 gigahertz",
            "8-core",
            "16",
            "Yes"
          ]
        }
      }
    ]
}
```

**DeliveryAddress**
```json
{
    "address1": "123 Easy Street",
    "address2": "Apt. 309",
    "city": "Youngstown",
    "state": "OH",
    "zipCode": 123456
  }
```

**LineItem**
```json
 {
    "id": 1,
    "quantity": 1
}
```

**Product**
```json
[
  {
    "id": 1,
    "name": "AMD - Ryzen 7 7800X3D 8-Core - 16-Thread 4.2 GHz (5.0 GHz Max Boost) Socket AM5 Unlocked Desktop Processor - Black",
    "model": "100-100000910WOF",
    "price": 369,
    "category": "CPU",
    "product_image": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6537/6537139cv11d.jpg;maxHeight=200;maxWidth=300",
    "description": "AMD Ryzen 7 7800X3D The dominant gaming processor with AMD 3D V-Cache technology for even more game performance.  Whatever the setting, whatever the resolution, lead your team to victory with this incredible gaming processor.  Plus, enjoy the benefits of next-gen AMD 3D V-Cache technology for lower latency and even more game performance. ",
    "specifications": [
      "Socket AM5 (LGA 1718)",
      "4.2 gigahertz",
      "5 gigahertz",
      "8-core",
      "16",
      "Yes"
    ]
  }
]
```

### PC Parts APP
- Vite is the framework of choice for me as I am familiar with it, and it offers many features for creating an effective web application.


### Challenges Faced
- One challenge I faced was implementing a cart for both authenticated and non-authenticated users. The original solution I came up with was to use local storage to store a persistent cart for unauthenticated users. I quickly realized this was inefficient because I am using [Tanstack Query](https://tanstack.com/query/latest) to hand api requests, and limiting myself to local storage did not allow me to take advanatge of the features it provided.
- To solve this problem once and for all, I decided to alter the cart since it already existed, and allowed cart creating by using a session id that is stored in a user's browser cookies. This allowed me to take advantage of Tanstack Query's features and allowed for the implementation of a uniform cart for authenticated, and non-authenticated users. 
