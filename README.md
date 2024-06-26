# SETUP INSTRUCTIONS

### Tech Stack

```bash
 1. Fastify
 2. Redis
 3. PostgreSQL
```

#### Clone the project

```bash
https://github.com/factscub/cracks-koliko-backend.git
```

#### Go to the project directory

```bash
  cd cracks-koliko-backend
```

## Copy .env.example file to .env to make things work

#### Linux/macOs

```bash
$ cp .env.example .env
```

#### Windows

```bash
copy .env.example .env
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:watch

# production mode
$ npm run start:prod
```

## Application URL

### Local

```bash
localhost:8000
```

# API Reference

#### 1. Creates a user and adds some $10000 by default to make transactions.(My database already has 10 users whose IDs start from 1-10. So no need to call this API).

```http
GET /api/user/create-user
```

#### Example:

```http
localhost:8000/api/user/create-user
```

### Response

```bash
{
  id: number,
  balance: number
}
```

### 2. `user_id` and `amount` must be passed as query strings to perform transactions.

```http
  GET /api/user/deduct-balance?user_id=${value}&amount=${value}
```

#### Example: To deduct $100 from user with ID=1

```http
localhost:8000/api/user/deduct-balance?user_id=1&amount=100
```


| Query Parameter | Type     | Description  |
| :-------------- | :------- | :----------- |
| `user_id`       | `number` | **Required** |
| `amount`        | `number` | **Required** |

### Response

```bash
{
  message: string
}
```

### 3. Fetches all items from `skinport website`, adds two extra fields `tradable_price` and `non_tradable_price` and `name` to the array of objects and caches it for 30 minutes.

#### Query params are Optional.By default `app_id=730` and `currency=EUR`.

```http
  GET /api/items/all?app_id=${value}&currency=${value}
```

#### So just call the API this way

```http
  GET /api/items/all
```

#### Example:

```http
localhost:8000/api/items/all
```

| Query Parameter | Type     | Description  |
| :-------------- | :------- | :----------- |
| `app_id`        | `number` | **Optional** |
| `currency`      | `string` | **Optional** |

### Response

```bash
{
  name: string,
  min_prices:{
      tradable_price: number,
      non_tradable_price: number,
    },
}
```
