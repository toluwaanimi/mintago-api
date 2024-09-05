# Supabase Setup Guide ⚙️🗄️

This guide will walk you through the steps to set up **Supabase** as your datastore for the **Mintago Pension API**. Supabase is an open-source Firebase alternative that provides a powerful Postgres database with real-time subscriptions, authentication, and much more.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Creating a Supabase Project](#creating-a-supabase-project)
- [Configuring Environment Variables](#configuring-environment-variables)
- [Setting Up the Database](#setting-up-the-database)
   - [Pension Pots Table](#pension-pots-table)
   - [Searched Pensions Table](#searched-pensions-table)
- [Inserting Initial Data](#inserting-initial-data)
- [Running the API with Supabase](#running-the-api-with-supabase)
- [Conclusion](#conclusion)

---

## Prerequisites ✅

Before getting started, ensure you have the following:

1. A Supabase account. If you don’t have one, you can sign up for free at [Supabase](https://supabase.com/).
2. Node.js and npm or yarn installed on your local machine.

---

## Creating a Supabase Project 🏗️

1. **Sign in to Supabase:**

   Head over to [app.supabase.io](https://app.supabase.io/) and log in to your account.

2. **Create a New Project:**

   - Click on **New Project**.
   - Select a name for your project and choose a region close to you.
   - Click on **Create New Project**.

3. **Set the Database Password:**

   During the project creation, you'll be asked to set a password for the database. Make sure to store this password securely as you will need it later for your environment configuration.

4. **Access Project Settings:**

   Once the project is created, navigate to the **Settings** tab to find the `API URL` and `API Key`. These will be required for configuring your local environment.

---

## Configuring Environment Variables 🌍

After setting up your Supabase project, you'll need to configure your environment variables in the `.env` file for the **Mintago Pension API**.

1. **Create a `.env` file** in the root directory of your project (if not already created).

2. **Add the following variables**:

   ```bash
   # .env

   PORT=3000
   NODE_ENV=development
   DATASTORE=supabase  # Set to 'supabase' to use Supabase as the database

   SUPABASE_URL=https://your-supabase-url.supabase.co  # Replace with your Supabase URL
   SUPABASE_KEY=your-supabase-api-key  # Replace with your Supabase API key
   ```

   - `SUPABASE_URL`: Found in the **API** section of your Supabase project.
   - `SUPABASE_KEY`: The **anon** public API key for your project.

---

## Setting Up the Database 🗄️

You will need to create two tables: `pension_pots` and `searched_pensions`.

### Pension Pots Table

1. Navigate to **Table Editor** in the Supabase dashboard.
2. Click on **New Table** and enter the following schema for `pension_pots`:

```sql
CREATE TABLE IF NOT EXISTS pension_pots (
    id UUID PRIMARY KEY,
    potName VARCHAR(255),
    annualInterestRate FLOAT,
    defaultAnnualInterestRate FLOAT NOT NULL,
    pensionProvider JSONB, -- To store provider name and value
    amount DECIMAL NOT NULL,
    employer VARCHAR(255),
    lastUpdatedAt TIMESTAMP NOT NULL,
    monthlyPayment DECIMAL NOT NULL,
    isWorkplacePension BOOLEAN NOT NULL
);
```

- **pensionProvider** is stored as a `JSONB` field to accommodate the provider name and value.

### Searched Pensions Table

The `searched_pensions` table now references the `pension_pots` table through a foreign key (`pension_pot_id`). This ensures that we avoid redundant pension pot data in the `searched_pensions` table.

1. Click on **New Table** and enter the following schema for `searched_pensions`:

```sql
CREATE TABLE IF NOT EXISTS searched_pensions (
    id UUID PRIMARY KEY,
    pension_pot_id UUID REFERENCES pension_pots(id) ON DELETE CASCADE,  -- Foreign key to pension_pots
    policyNumber VARCHAR(255),
    annualFee FLOAT,
    status VARCHAR(50) NOT NULL,
    previousName VARCHAR(255),
    previousAddress VARCHAR(255),
    lastUpdatedAt TIMESTAMP NOT NULL,
    foundOn TIMESTAMP,
    isDraft BOOLEAN NOT NULL
);
```

- **pension_pot_id**: References the `pension_pots` table. This ensures that all the pension pot details are only stored in one place, and the searched pensions reference them.

---

## Inserting Initial Data 💾

Once the tables are created, you can insert data into them. You can either use the **Supabase SQL Editor** or the following SQL scripts to insert the data:

### Pension Pots Data

```sql
INSERT INTO pension_pots (id, potName, annualInterestRate, defaultAnnualInterestRate, pensionProvider, amount, employer, lastUpdatedAt, monthlyPayment, isWorkplacePension)
VALUES
('e181e498-9cab-4570-a188-ed699dc5eefd', 'Google', 0.02, 0.02, '{"name": "Aviva", "value": "AVIVA"}', 36700, 'Google', '2024-06-13T13:23:55.614Z', 335.53, true),
('5de51030-02f3-48c0-bd54-024120bac5ba', 'IBM', 0.04, 0.02, '{"name": "Scottish Widows", "value": "SCOTTISH_WIDOWS"}', 20000, 'IBM', '2024-08-05T14:31:20.506Z', 0, false),
('1509481e-565d-444a-8e24-d72d3244b663', 'Mintago', NULL, 0.02, '{"name": null, "value": null}', 100, 'Mintago', '2024-05-22T17:56:45.028Z', 0, false),
('c759b80a-558a-488d-aba9-f1ee9593020b', 'Microsoft', 0.02, 0.02, '{"name": null, "value": null}', 123868, 'Microsoft', '2024-05-23T13:42:22.780Z', 0, false),
('3e2bfea6-d7bb-4ef6-8dea-2a149b4ef24c', 'Pot 1', 0.035, 0.02, '{"name": null, "value": null}', 12345, null, '2024-05-23T13:42:38.354Z', 300, false),
('1bbb9dfc-eb62-4988-9fab-7e0a52844d8c', 'Pot 2', 0.02, 0.02, '{"name": null, "value": null}', 1200, null, '2024-05-23T13:43:12.606Z', 0, false),
('d18083cf-4990-4248-a3e8-37140706a8d7', 'A company', 0.002, 2.00, '{"name": null, "value": null}', 40000, null, '2024-08-05T14:31:26.067Z', 200, false),
('0a4c2ed0-3b0c-4606-817e-e6f8d14dbfd2', 'Searched Pension', 0.02, 0.02, '{"name": null, "value": null}', 0, 'Homebase', '2022-05-21T17:32:03.376Z', 0, false),
('4b6004d2-58f6-45c6-9a27-045b9571ae3e', 'Pension', 0.02, 0.02, '{"name": null, "value": null}', 40000, 'Telegraph', '2024-06-11T10:52:33.819Z', 0, false);


```

### Searched Pensions Data

```sql
INSERT INTO searched_pensions (id, pension_pot_id, policyNumber, annualFee, status, previousName, previousAddress, foundOn, lastUpdatedAt, isDraft)
VALUES
   ('9f0b9d90-6a8e-4c23-b784-4bce4a5c3d7f', '0a4c2ed0-3b0c-4606-817e-e6f8d14dbfd2', NULL, NULL, 'TO_HUNT', NULL, '12 Something St', '2020-06-11T10:52:33.819Z', '2024-06-11T10:52:33.819Z', true),
   ('3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499', '4b6004d2-58f6-45c6-9a27-045b9571ae3e', NULL, NULL, 'FOUND', NULL, '12 Something St', '2024-08-11T10:52:33.819Z', '2024-06-11T10:52:33.819Z', false);
```

---

## Running the API with Supabase ▶️

Once the tables are set up and the data is inserted, follow these steps to run the API using Supabase as the datastore:

1. **Ensure the `.env` file is correctly configured** to use Supabase:

   ```bash
   DATASTORE=supabase
   SUPABASE_URL=https://your-supabase-url.supabase.co
   SUPABASE_KEY=your-supabase-api-key
   ```

2. **Start the server** in development mode:

   ```bash
   npm run start:dev
   ```

3. **Access the API** via `http://localhost:3000`.

4. **Verify Supabase is working** by querying the endpoints (e.g., `/pensions` and `/pension-pots/search`).

---

## Conclusion 🎉

With Supabase set up as your database for the **Mintago Pension API**, you can now manage and query pension data using a scalable and real-time database. The API is ready to handle operations on pension pots and searched pensions with full support for Supabase.

For additional Supabase features like real-time subscriptions, authentication, or advanced Postgres features, explore the [Supabase Documentation](https://supabase.com/docs).
