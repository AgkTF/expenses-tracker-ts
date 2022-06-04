/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/balance": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.balance.id"];
          old_balance?: parameters["rowFilter.balance.old_balance"];
          new_balance?: parameters["rowFilter.balance.new_balance"];
          trans_id?: parameters["rowFilter.balance.trans_id"];
          created_at?: parameters["rowFilter.balance.created_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["balance"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** balance */
          balance?: definitions["balance"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.balance.id"];
          old_balance?: parameters["rowFilter.balance.old_balance"];
          new_balance?: parameters["rowFilter.balance.new_balance"];
          trans_id?: parameters["rowFilter.balance.trans_id"];
          created_at?: parameters["rowFilter.balance.created_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.balance.id"];
          old_balance?: parameters["rowFilter.balance.old_balance"];
          new_balance?: parameters["rowFilter.balance.new_balance"];
          trans_id?: parameters["rowFilter.balance.trans_id"];
          created_at?: parameters["rowFilter.balance.created_at"];
        };
        body: {
          /** balance */
          balance?: definitions["balance"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/card": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card.id"];
          type?: parameters["rowFilter.card.type"];
          name?: parameters["rowFilter.card.name"];
          number?: parameters["rowFilter.card.number"];
          created_at?: parameters["rowFilter.card.created_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["card"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** card */
          card?: definitions["card"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card.id"];
          type?: parameters["rowFilter.card.type"];
          name?: parameters["rowFilter.card.name"];
          number?: parameters["rowFilter.card.number"];
          created_at?: parameters["rowFilter.card.created_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card.id"];
          type?: parameters["rowFilter.card.type"];
          name?: parameters["rowFilter.card.name"];
          number?: parameters["rowFilter.card.number"];
          created_at?: parameters["rowFilter.card.created_at"];
        };
        body: {
          /** card */
          card?: definitions["card"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/card_type": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card_type.id"];
          name?: parameters["rowFilter.card_type.name"];
          created_at?: parameters["rowFilter.card_type.created_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["card_type"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** card_type */
          card_type?: definitions["card_type"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card_type.id"];
          name?: parameters["rowFilter.card_type.name"];
          created_at?: parameters["rowFilter.card_type.created_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.card_type.id"];
          name?: parameters["rowFilter.card_type.name"];
          created_at?: parameters["rowFilter.card_type.created_at"];
        };
        body: {
          /** card_type */
          card_type?: definitions["card_type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/category": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category.id"];
          created_at?: parameters["rowFilter.category.created_at"];
          description?: parameters["rowFilter.category.description"];
          type?: parameters["rowFilter.category.type"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["category"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** category */
          category?: definitions["category"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category.id"];
          created_at?: parameters["rowFilter.category.created_at"];
          description?: parameters["rowFilter.category.description"];
          type?: parameters["rowFilter.category.type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category.id"];
          created_at?: parameters["rowFilter.category.created_at"];
          description?: parameters["rowFilter.category.description"];
          type?: parameters["rowFilter.category.type"];
        };
        body: {
          /** category */
          category?: definitions["category"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/category_type": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category_type.id"];
          name?: parameters["rowFilter.category_type.name"];
          created_at?: parameters["rowFilter.category_type.created_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["category_type"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** category_type */
          category_type?: definitions["category_type"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category_type.id"];
          name?: parameters["rowFilter.category_type.name"];
          created_at?: parameters["rowFilter.category_type.created_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.category_type.id"];
          name?: parameters["rowFilter.category_type.name"];
          created_at?: parameters["rowFilter.category_type.created_at"];
        };
        body: {
          /** category_type */
          category_type?: definitions["category_type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/month_category": {
    get: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category.type"];
          planned_amount?: parameters["rowFilter.month_category.planned_amount"];
          created_at?: parameters["rowFilter.month_category.created_at"];
          id?: parameters["rowFilter.month_category.id"];
          category_id?: parameters["rowFilter.month_category.category_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["month_category"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** month_category */
          month_category?: definitions["month_category"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category.type"];
          planned_amount?: parameters["rowFilter.month_category.planned_amount"];
          created_at?: parameters["rowFilter.month_category.created_at"];
          id?: parameters["rowFilter.month_category.id"];
          category_id?: parameters["rowFilter.month_category.category_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category.type"];
          planned_amount?: parameters["rowFilter.month_category.planned_amount"];
          created_at?: parameters["rowFilter.month_category.created_at"];
          id?: parameters["rowFilter.month_category.id"];
          category_id?: parameters["rowFilter.month_category.category_id"];
        };
        body: {
          /** month_category */
          month_category?: definitions["month_category"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/month_category_duplicate": {
    get: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category_duplicate.type"];
          name?: parameters["rowFilter.month_category_duplicate.name"];
          planned_amount?: parameters["rowFilter.month_category_duplicate.planned_amount"];
          created_at?: parameters["rowFilter.month_category_duplicate.created_at"];
          id?: parameters["rowFilter.month_category_duplicate.id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["month_category_duplicate"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** month_category_duplicate */
          month_category_duplicate?: definitions["month_category_duplicate"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category_duplicate.type"];
          name?: parameters["rowFilter.month_category_duplicate.name"];
          planned_amount?: parameters["rowFilter.month_category_duplicate.planned_amount"];
          created_at?: parameters["rowFilter.month_category_duplicate.created_at"];
          id?: parameters["rowFilter.month_category_duplicate.id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          type?: parameters["rowFilter.month_category_duplicate.type"];
          name?: parameters["rowFilter.month_category_duplicate.name"];
          planned_amount?: parameters["rowFilter.month_category_duplicate.planned_amount"];
          created_at?: parameters["rowFilter.month_category_duplicate.created_at"];
          id?: parameters["rowFilter.month_category_duplicate.id"];
        };
        body: {
          /** month_category_duplicate */
          month_category_duplicate?: definitions["month_category_duplicate"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/transaction": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transaction.id"];
          amount?: parameters["rowFilter.transaction.amount"];
          category_id?: parameters["rowFilter.transaction.category_id"];
          card_id?: parameters["rowFilter.transaction.card_id"];
          is_deleted?: parameters["rowFilter.transaction.is_deleted"];
          created_at?: parameters["rowFilter.transaction.created_at"];
          date?: parameters["rowFilter.transaction.date"];
          description?: parameters["rowFilter.transaction.description"];
          trans_type?: parameters["rowFilter.transaction.trans_type"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["transaction"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** transaction */
          transaction?: definitions["transaction"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transaction.id"];
          amount?: parameters["rowFilter.transaction.amount"];
          category_id?: parameters["rowFilter.transaction.category_id"];
          card_id?: parameters["rowFilter.transaction.card_id"];
          is_deleted?: parameters["rowFilter.transaction.is_deleted"];
          created_at?: parameters["rowFilter.transaction.created_at"];
          date?: parameters["rowFilter.transaction.date"];
          description?: parameters["rowFilter.transaction.description"];
          trans_type?: parameters["rowFilter.transaction.trans_type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transaction.id"];
          amount?: parameters["rowFilter.transaction.amount"];
          category_id?: parameters["rowFilter.transaction.category_id"];
          card_id?: parameters["rowFilter.transaction.card_id"];
          is_deleted?: parameters["rowFilter.transaction.is_deleted"];
          created_at?: parameters["rowFilter.transaction.created_at"];
          date?: parameters["rowFilter.transaction.date"];
          description?: parameters["rowFilter.transaction.description"];
          trans_type?: parameters["rowFilter.transaction.trans_type"];
        };
        body: {
          /** transaction */
          transaction?: definitions["transaction"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** @description this table tracks the change happen to the available balance */
  balance: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: bigint */
    old_balance?: number;
    /** Format: bigint */
    new_balance?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `transaction.id`.<fk table='transaction' column='id'/>
     */
    trans_id?: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
  };
  card: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `card_type.id`.<fk table='card_type' column='id'/>
     */
    type?: number;
    /** Format: character varying */
    name?: string;
    /** Format: bigint */
    number?: number;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
  };
  card_type: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: character varying */
    name?: string;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
  };
  /** @description All the categories the user adds from the user settings page. */
  category: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    description: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `category_type.id`.<fk table='category_type' column='id'/>
     */
    type: number;
  };
  category_type: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: character varying */
    name?: string;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
  };
  month_category: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `category_type.id`.<fk table='category_type' column='id'/>
     */
    type?: number;
    /** Format: double precision */
    planned_amount?: number;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `category.id`.<fk table='category' column='id'/>
     */
    category_id?: number;
  };
  month_category_duplicate: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `category_type.id`.<fk table='category_type' column='id'/>
     */
    type?: number;
    /** Format: character varying */
    name?: string;
    /** Format: double precision */
    planned_amount?: number;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
  };
  transaction: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: double precision */
    amount: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `month_category.id`.<fk table='month_category' column='id'/>
     */
    category_id?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `card.id`.<fk table='card' column='id'/>
     */
    card_id?: number;
    /** Format: boolean */
    is_deleted?: boolean;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at?: string;
    /** Format: timestamp without time zone */
    date: string;
    /** Format: character varying */
    description?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `category_type.id`.<fk table='category_type' column='id'/>
     */
    trans_type?: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description balance */
  "body.balance": definitions["balance"];
  /** Format: uuid */
  "rowFilter.balance.id": string;
  /** Format: bigint */
  "rowFilter.balance.old_balance": string;
  /** Format: bigint */
  "rowFilter.balance.new_balance": string;
  /** Format: bigint */
  "rowFilter.balance.trans_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.balance.created_at": string;
  /** @description card */
  "body.card": definitions["card"];
  /** Format: bigint */
  "rowFilter.card.id": string;
  /** Format: bigint */
  "rowFilter.card.type": string;
  /** Format: character varying */
  "rowFilter.card.name": string;
  /** Format: bigint */
  "rowFilter.card.number": string;
  /** Format: timestamp with time zone */
  "rowFilter.card.created_at": string;
  /** @description card_type */
  "body.card_type": definitions["card_type"];
  /** Format: bigint */
  "rowFilter.card_type.id": string;
  /** Format: character varying */
  "rowFilter.card_type.name": string;
  /** Format: timestamp with time zone */
  "rowFilter.card_type.created_at": string;
  /** @description category */
  "body.category": definitions["category"];
  /** Format: bigint */
  "rowFilter.category.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.category.created_at": string;
  /** Format: character varying */
  "rowFilter.category.description": string;
  /** Format: bigint */
  "rowFilter.category.type": string;
  /** @description category_type */
  "body.category_type": definitions["category_type"];
  /** Format: bigint */
  "rowFilter.category_type.id": string;
  /** Format: character varying */
  "rowFilter.category_type.name": string;
  /** Format: timestamp with time zone */
  "rowFilter.category_type.created_at": string;
  /** @description month_category */
  "body.month_category": definitions["month_category"];
  /** Format: bigint */
  "rowFilter.month_category.type": string;
  /** Format: double precision */
  "rowFilter.month_category.planned_amount": string;
  /** Format: timestamp with time zone */
  "rowFilter.month_category.created_at": string;
  /** Format: bigint */
  "rowFilter.month_category.id": string;
  /** Format: bigint */
  "rowFilter.month_category.category_id": string;
  /** @description month_category_duplicate */
  "body.month_category_duplicate": definitions["month_category_duplicate"];
  /** Format: bigint */
  "rowFilter.month_category_duplicate.type": string;
  /** Format: character varying */
  "rowFilter.month_category_duplicate.name": string;
  /** Format: double precision */
  "rowFilter.month_category_duplicate.planned_amount": string;
  /** Format: timestamp with time zone */
  "rowFilter.month_category_duplicate.created_at": string;
  /** Format: bigint */
  "rowFilter.month_category_duplicate.id": string;
  /** @description transaction */
  "body.transaction": definitions["transaction"];
  /** Format: bigint */
  "rowFilter.transaction.id": string;
  /** Format: double precision */
  "rowFilter.transaction.amount": string;
  /** Format: bigint */
  "rowFilter.transaction.category_id": string;
  /** Format: bigint */
  "rowFilter.transaction.card_id": string;
  /** Format: boolean */
  "rowFilter.transaction.is_deleted": string;
  /** Format: timestamp with time zone */
  "rowFilter.transaction.created_at": string;
  /** Format: timestamp without time zone */
  "rowFilter.transaction.date": string;
  /** Format: character varying */
  "rowFilter.transaction.description": string;
  /** Format: bigint */
  "rowFilter.transaction.trans_type": string;
}

export interface operations {}

export interface external {}
