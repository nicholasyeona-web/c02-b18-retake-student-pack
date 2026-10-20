# Makan Trail — Street Food Guide API

Back-end for **J620-002-4:2020-C02 Practical Assessment (B18)**.

> **DO NOT MODIFY the contents of this folder.** Your work is done entirely in
> the `b18-retake-app-qv` folder.

## Running the server

```
npm install
npm start
```

The server starts on **http://localhost:5123**.

All endpoints are `GET`, return JSON, and have CORS enabled, so your React app
running on `http://localhost:5173` can call them directly.

---

## Endpoints

### 1. `GET /menu`

Returns the street food menu: hawker dishes, desserts and drinks from six
Malaysian states. Supports search, filtering, sorting and pagination.

**Query parameters** — all optional

| Parameter | Values | Notes |
|-----------|--------|-------|
| `search` | any text | matches the `name` **or** the `mainIngredient`, case-insensitive, partial match |
| `state`  | `Penang`, `Kuala Lumpur`, `Melaka`, `Perak`, `Kelantan`, `Sarawak` | case-insensitive |
| `course` | `Main`, `Dessert`, `Drink` | case-insensitive |
| `sort`   | `name`, `price` | `name` sorts A→Z; `price` sorts cheapest→most expensive (items with the same price are sorted by name) |
| `page`   | integer | default `1` |
| `limit`  | integer | default `10` |

`search`, `state` and `course` can be used on their own or **combined** (each
one narrows the results further). Sorting and pagination are applied to
whatever matches.

There are **62** items in total. With the default `limit=10` that is 7 pages.

**Example**

```
GET http://localhost:5123/menu?search=coconut&course=Dessert&sort=price&page=1&limit=5
```

This returns the first page (5 per page) of desserts whose name or main
ingredient contains `"coconut"`, sorted from the cheapest.

**Response** — an object containing pagination information and a `data` array:

```json
{
  "page": 1,
  "limit": 5,
  "total": 6,
  "totalPages": 2,
  "data": [
    {
      "id": 36,
      "name": "Puteri Mandi",
      "course": "Dessert",
      "state": "Kelantan",
      "mainIngredient": "Glutinous rice and grated coconut",
      "calories": 190,
      "price": 2
    },
    {
      "id": 23,
      "name": "Kuih Lapis",
      "course": "Dessert",
      "state": "Kuala Lumpur",
      "mainIngredient": "Rice flour and coconut milk",
      "calories": 180,
      "price": 2.4
    },
    {
      "id": 30,
      "name": "Dodol",
      "course": "Dessert",
      "state": "Melaka",
      "mainIngredient": "Coconut milk and palm sugar",
      "calories": 210,
      "price": 3.2
    },
    {
      "id": 35,
      "name": "Akok",
      "course": "Dessert",
      "state": "Kelantan",
      "mainIngredient": "Egg and coconut milk",
      "calories": 250,
      "price": 3.4
    },
    {
      "id": 34,
      "name": "Kaya Puff",
      "course": "Dessert",
      "state": "Perak",
      "mainIngredient": "Coconut jam",
      "calories": 330,
      "price": 4.8
    }
  ]
}
```

> Note: this endpoint does **not** return a bare array. The items are inside
> the `data` property. `total` is the number of items that match your search
> and filters, and `totalPages` tells you how many pagination buttons to
> render.

`calories` is per serving. `price` is in Malaysian ringgit (RM).

---

### 2. `GET /states`

Returns the list of states used in the menu. Useful for building the state
dropdown without hard-coding the options.

**Response**

```json
["Kelantan", "Kuala Lumpur", "Melaka", "Penang", "Perak", "Sarawak"]
```

---

## More examples

```
GET /menu                                   page 1, 10 items per page, unsorted
GET /menu?search=noodle                     every noodle dish (matches the main ingredient)
GET /menu?search=laksa                      matches names
GET /menu?state=Sarawak                     Sarawak items only
GET /menu?course=Drink                      drinks only
GET /menu?state=Penang&course=Dessert       both filters combined
GET /menu?sort=name                         sorted A to Z
GET /menu?sort=price                        cheapest first
GET /menu?limit=20                          20 items per page
GET /menu?page=3&limit=5                    third page, 5 items per page
```

## Notes

- Every search, filter, sort and pagination operation is performed **by this
  back-end**. Your React app must send the correct query parameters and render
  whatever the API returns — do not filter or sort the data in the browser.
- Handle the case where no items match: the API returns an empty `data` array
  (with `total` 0) rather than an error.
