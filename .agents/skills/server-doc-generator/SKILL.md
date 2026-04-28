---
name: server-doc-generator
description: Expertise in generating comprehensive JSDoc documentation for backend server code.
---
# Server Documentation Generator Skill

## Description
Generates comprehensive JSDoc documentation for all server-side code in `real-estate-server/`. Documents all modules, routes, controllers, services, schemas, and validation files with proper JSDoc comments in a clear, understandable format.

## When to Use
- When the user requests documentation for server code
- When preparing code for code review
- When setting up Swagger/OpenAPI docs
- When new server modules are created

## Workflow

### 1. Read Project Structure
First, understand the server architecture:
```bash
cd real-estate-server && find src/modules -type f -name "*.ts" | sort
```

### 2. Document Each Module
For each module in `src/modules/<module-name>/`, document:

#### Schema Files (`*-schema.ts`)
Add JSDoc comments for:
- Interface definition (purpose, fields description)
- Schema definition (field types, validation rules)
- Model export

Example:
```typescript
/**
 * @fileoverview Real Estate Property Schema
 * @module RealEstateModel
 */

import mongoose from 'mongoose';

/**
 * Interface representing a Real Estate property document
 * @interface IRealEstate
 * @extends {mongoose.Document}
 */
export interface IRealEstate extends mongoose.Document {
  /** Unique identifier */
  _id: mongoose.Types.ObjectId;
  /** Property title (required, string) */
  title: string;
  /** Detailed description of the property */
  description: string;
  /** Price in USD */
  price: number;
  /** Location object containing address, city, country, coordinates */
  location: {
    /** Full street address */
    address: string;
    /** City name */
    city: string;
    /** Country name */
    country: string;
    /** Longitude coordinate (string) */
    lng: string;
    /** Latitude coordinate (string) */
    lat: string;
  };
  /** Number of bedrooms */
  bedrooms: number;
  /** Number of bathrooms */
  bathrooms: number;
  /** Area in square feet */
  area: number;
  /** Type of property (apartment, house, villa, commercial) */
  propertyType: string;
  /** Status of the property (available, sold, pending) */
  status: string;
  /** Listing type (buy, rent) */
  type: string;
  /** Array of image URLs */
  images: string[];
  /** Number of likes (for trending calculation) */
  likes: number;
  /** Number of views (for trending calculation) */
  views: number;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Mongoose schema for Real Estate properties
 * @type {mongoose.Schema<IRealEstate>}
 */
const realEstateSchema = new mongoose.Schema<IRealEstate>(
  {
    title: { type: String, required: true },
    // ... rest of schema
  },
  { timestamps: true }
);

/**
 * Real Estate Mongoose Model
 * @type {mongoose.Model<IRealEstate>}
 */
const RealEstateModel = mongoose.model<IRealEstate>('RealEstate', realEstateSchema);
export default RealEstateModel;
```

#### Service Files (`*-service.ts`)
Add JSDoc for:
- Function purpose
- Parameters with types
- Return values
- Error handling
- Example usage

Example:
```typescript
/**
 * Create a new real estate property
 * @async
 * @function createRealEstate
 * @param {CreateRealEstatePayload} data - Property data to create
 * @returns {Promise<IRealEstate>} Created property document
 * @throws {Error} If creation fails
 * @example
 * const property = await createRealEstate({
 *   title: "Luxury Villa",
 *   price: 500000,
 *   // ... other fields
 * });
 */
export const createRealEstate = async (data: CreateRealEstatePayload) => {
  try {
    const realEstate = await RealEstateModel.create(data);
    return realEstate;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all real estate properties with filtering and pagination
 * @async
 * @function getRealEstates
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 10)
 * @param {string} [search] - Search term for title or address
 * @param {string} [propertyType] - Filter by property type
 * @param {number} [minPrice] - Minimum price filter
 * @param {number} [maxPrice] - Maximum price filter
 * @returns {Promise<{realEstates: IRealEstate[], pagination: Object}>} Properties with pagination info
 */
export const getRealEstates = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  propertyType?: string,
  minPrice?: number,
  maxPrice?: number,
) => {
  // ... implementation
};
```

#### Controller Files (`*-controller.ts`)
Document:
- Controller purpose
- Request/Response types
- Status codes
- Error responses

Example:
```typescript
/**
 * @fileoverview Real Estate Controller
 * @description Handles HTTP requests for property endpoints
 */

import { Request, Response } from 'express';

/**
 * Controller to create a new real estate property
 * @async
 * @function createRealEstateController
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response
 * @status 201 - Property created successfully
 * @status 400 - Validation error
 * @status 500 - Server error
 */
export const createRealEstateController = async (
  req: Request<{}, {}, CreateRealEstatePayload>,
  res: Response,
) => {
  try {
    const realEstate = await createRealEstate(req.body);
    return res.status(201).json({
      success: true,
      message: 'Real estate created successfully',
      data: realEstate,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
```

#### Route Files (`*-routes.ts`)
Document:
- Route group purpose
- All endpoints with methods
- Middleware used
- Access restrictions

Example:
```typescript
/**
 * @fileoverview Real Estate Routes
 * @description Express router for property-related endpoints
 * @routes
 * - POST / (create property) - Admin only
 * - GET / (list properties) - Public
 * - GET /:id (get property by ID) - User/Admin
 * - POST /:id/images (upload images) - Admin only
 * - POST /:id/view (increment views) - Public
 * - GET /trending (trending properties) - Public
 */

import { Router } from 'express';
const realEstateRouter = Router();

/**
 * POST /real-estate
 * Create new property (Admin only)
 */
realEstateRouter.post(
  '/',
  authMiddleware,
  authorize(['admin']),
  validateRequest(createRealEstateSchema),
  createRealEstateController,
);

// ... other routes
```

#### Validation Files (`*-validation.ts`)
Document schemas:
```typescript
/**
 * @fileoverview Real Estate Validation Schemas
 * @description Zod validation schemas for property operations
 */

import { z } from 'zod';

/**
 * Schema for creating a new real estate property
 * @type {z.ZodObject}
 * @property {z.ZodString} title - Property title (min 3 chars)
 * @property {z.ZodString} description - Property description (min 10 chars)
 * @property {z.ZodNumber} price - Price (positive number)
 * @property {z.ZodObject} location - Location object with address, city, country, coordinates
 * @property {z.ZodNumber} bedrooms - Number of bedrooms (min 0)
 * @property {z.ZodNumber} bathrooms - Number of bathrooms (min 0)
 * @property {z.ZodNumber} area - Area in sq ft (positive)
 * @property {z.ZodEnum} propertyType - Type of property
 * @property {z.ZodEnum} status - Property status
 * @property {z.ZodEnum} type - Listing type
 * @property {z.ZodArray} images - Array of image URLs (optional)
 * @property {z.ZodNumber} likes - Likes count (optional, default 0)
 */
export const createRealEstateSchema = z.object({
  title: z.string().min(3),
  // ... rest of schema
});
```

#### Types Files (`*-types.ts`)
Document interfaces:
```typescript
/**
 * @fileoverview Real Estate Types
 * @description TypeScript types and interfaces for Real Estate module
 */

import { z } from 'zod';
import { createRealEstateSchema } from './real-estate.validation';

/**
 * Payload for creating a new real estate property
 * @type {CreateRealEstatePayload}
 * @property {string} title - Property title
 * @property {string} description - Detailed description
 * @property {number} price - Property price in USD
 * @property {Object} location - Location information
 * @property {number} bedrooms - Number of bedrooms
 * @property {number} bathrooms - Number of bathrooms
 * @property {number} area - Area in square feet
 * @property {string} propertyType - Type of property
 * @property {string} status - Current status
 * @property {string} type - Listing type (buy/rent)
 * @property {string[]} [images] - Optional array of image URLs
 * @property {number} [likes] - Optional likes count
 */
export type CreateRealEstatePayload = z.infer<typeof createRealEstateSchema>;
```

### 3. Generate Documentation Summary
After documenting all files, create a `docs/server-api.md` file:

```markdown
# Real Estate Server API Documentation

## Overview
Brief description of the API and its purpose.

## Modules
List all modules with links to their documentation.

### Real Estate Module
- **Schema**: `real-estate.schema.ts`
- **Service**: `real-estate.service.ts`
- **Controller**: `real-estate.controller.ts`
- **Routes**: `real-estate.routes.ts`
- **Validation**: `real-estate.validation.ts`
- **Types**: `real-estate.types.ts`

## API Endpoints

### Properties
| Method | Endpoint | Description | Access |
|--------|-----------|-------------|--------|
| POST | `/api/real-estate` | Create property | Admin |
| GET | `/api/real-estate` | List properties (with filters) | Public |
| GET | `/api/real-estate/:id` | Get property by ID | User/Admin |
| POST | `/api/real-estate/:id/images` | Upload images | Admin |
| POST | `/api/real-estate/:id/view` | Increment views | Public |
| GET | `/api/real-estate/trending` | Get trending properties | Public |

## Data Models

### IRealEstate
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto | Unique identifier |
| title | String | Yes | Property title |
| price | Number | Yes | Price in USD |
| location.address | String | Yes | Full address |
| location.city | String | Yes | City name |
| bedrooms | Number | Yes | Number of bedrooms |
| images | Array[String] | No | Image URLs |

## Error Responses
Standard error response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
```

## Commands to Run

After creating the skill, run it with:
```bash
# Document all server modules
opencode "run server-doc-generator skill"

# Or manually trigger
opencode "document all server code with JSDoc comments"
```

## Notes
- Always follow JSDoc standards (@param, @returns, @throws, @example)
- Use clear, concise descriptions
- Document all parameters with types
- Include example usage where helpful
- Keep comments up-to-date when code changes
