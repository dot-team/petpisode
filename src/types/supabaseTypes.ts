export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            bookmarks: {
                Row: {
                    bookmark_id: string;
                    created_at: string;
                    post_id: string;
                    user_id: string;
                };
                Insert: {
                    bookmark_id?: string;
                    created_at?: string;
                    post_id?: string;
                    user_id?: string;
                };
                Update: {
                    bookmark_id?: string;
                    created_at?: string;
                    post_id?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'bookmark_post_id_fkey';
                        columns: ['post_id'];
                        isOneToOne: false;
                        referencedRelation: 'posts';
                        referencedColumns: ['post_id'];
                    },
                    {
                        foreignKeyName: 'bookmark_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            category_publish_logs: {
                Row: {
                    category_id: string;
                    created_at: string;
                    news_id: string;
                    publish_log_id: string;
                    published_at: string;
                };
                Insert: {
                    category_id?: string;
                    created_at?: string;
                    news_id?: string;
                    publish_log_id?: string;
                    published_at?: string;
                };
                Update: {
                    category_id?: string;
                    created_at?: string;
                    news_id?: string;
                    publish_log_id?: string;
                    published_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'category_publish_logs_category_id_fkey';
                        columns: ['category_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_categories';
                        referencedColumns: ['category_id'];
                    },
                    {
                        foreignKeyName: 'category_publish_logs_news_id_fkey';
                        columns: ['news_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_items';
                        referencedColumns: ['news_id'];
                    },
                ];
            };
            category_send_logs: {
                Row: {
                    category_id: string;
                    created_at: string;
                    news_id: string;
                    news_items_id: string;
                    send_log_id: string;
                    sended_at: string;
                };
                Insert: {
                    category_id?: string;
                    created_at?: string;
                    news_id?: string;
                    news_items_id?: string;
                    send_log_id?: string;
                    sended_at?: string;
                };
                Update: {
                    category_id?: string;
                    created_at?: string;
                    news_id?: string;
                    news_items_id?: string;
                    send_log_id?: string;
                    sended_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'category_send_logs_category_id_fkey';
                        columns: ['category_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_categories';
                        referencedColumns: ['category_id'];
                    },
                    {
                        foreignKeyName: 'category_send_logs_news_id_fkey';
                        columns: ['news_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_items';
                        referencedColumns: ['news_id'];
                    },
                ];
            };
            comments: {
                Row: {
                    comment_id: string;
                    content: string;
                    created_at: string;
                    deleted_at: string | null;
                    like: number;
                    paraent_id: string;
                    post_id: string;
                    updated_at: string | null;
                    user_id: string;
                };
                Insert: {
                    comment_id?: string;
                    content: string;
                    created_at?: string;
                    deleted_at?: string | null;
                    like?: number;
                    paraent_id?: string;
                    post_id?: string;
                    updated_at?: string | null;
                    user_id?: string;
                };
                Update: {
                    comment_id?: string;
                    content?: string;
                    created_at?: string;
                    deleted_at?: string | null;
                    like?: number;
                    paraent_id?: string;
                    post_id?: string;
                    updated_at?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'commnets_post_id_fkey';
                        columns: ['post_id'];
                        isOneToOne: false;
                        referencedRelation: 'posts';
                        referencedColumns: ['post_id'];
                    },
                    {
                        foreignKeyName: 'commnets_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            likes: {
                Row: {
                    comment_id: string;
                    created_at: string;
                    like_id: string;
                    news_id: string;
                    post_id: string;
                    target_type: string;
                    user_id: string;
                };
                Insert: {
                    comment_id?: string;
                    created_at?: string;
                    like_id?: string;
                    news_id?: string;
                    post_id?: string;
                    target_type?: string;
                    user_id?: string;
                };
                Update: {
                    comment_id?: string;
                    created_at?: string;
                    like_id?: string;
                    news_id?: string;
                    post_id?: string;
                    target_type?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'like_comment_id_fkey';
                        columns: ['comment_id'];
                        isOneToOne: false;
                        referencedRelation: 'comments';
                        referencedColumns: ['comment_id'];
                    },
                    {
                        foreignKeyName: 'like_news_id_fkey';
                        columns: ['news_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_items';
                        referencedColumns: ['news_id'];
                    },
                    {
                        foreignKeyName: 'like_post_id_fkey';
                        columns: ['post_id'];
                        isOneToOne: false;
                        referencedRelation: 'posts';
                        referencedColumns: ['post_id'];
                    },
                    {
                        foreignKeyName: 'like_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            news_species: {
                Row: {
                    species_id: string;
                    species: string;
                    created_at: string;
                    description: string;
                };
                Insert: {
                    species_id?: string;
                    species?: string;
                    created_at?: string;
                    description: string;
                };
                Update: {
                    species_id?: string;
                    species?: string;
                    created_at?: string;
                    description?: string;
                };
                Relationships: [];
            };
            news_categories: {
                Row: {
                    category: string;
                    category_id: string;
                    created_at: string;
                    description: string;
                    updated_at: string | null;
                };
                Insert: {
                    category?: string;
                    category_id?: string;
                    created_at?: string;
                    description?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    category?: string;
                    category_id?: string;
                    created_at?: string;
                    description?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
            pre_news_items: {
                Row: {
                    pre_news_id: string;
                    description: string;
                    link: string;
                    originallink: string;
                    pubDate: string;
                    title: string;
                    created_at: string;
                    category: string;
                    species: string;
                };
                Insert: {
                    pre_news_id?: string;
                    description?: string;
                    link?: string;
                    originallink?: string;
                    pubDate?: string;
                    title?: string;
                    created_at?: string;
                    category?: string;
                    species?: string;
                };
                Update: {
                    pre_news_id?: string;
                    description?: string;
                    link?: string;
                    originallink?: string;
                    pubDate?: string;
                    title?: string;
                    created_at?: string;
                    category?: string;
                    species?: string;
                };
                Relationships: [];
            };
            news_items: {
                Row: {
                    category_id: string;
                    contents: string;
                    created_at: string;
                    img_url: string;
                    is_published: boolean;
                    is_sended: boolean;
                    like: number;
                    news_id: string;
                    share: number;
                    source: string;
                    source_published_at: string;
                    species: string;
                    summary: string;
                    title: string;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    category_id?: string;
                    contents?: string;
                    created_at?: string;
                    img_url?: string;
                    is_published?: boolean;
                    is_sended?: boolean;
                    like?: number;
                    news_id?: string;
                    share?: number;
                    source?: string;
                    source_published_at?: string;
                    species?: string;
                    summary?: string;
                    title?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Update: {
                    category_id?: string;
                    contents?: string;
                    created_at?: string;
                    img_url?: string;
                    is_published?: boolean;
                    is_sended?: boolean;
                    like?: number;
                    news_id?: string;
                    share?: number;
                    source?: string;
                    source_published_at?: string;
                    species?: string;
                    summary?: string;
                    title?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'news_items_category_id_fkey';
                        columns: ['category_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_categories';
                        referencedColumns: ['category_id'];
                    },
                    {
                        foreignKeyName: 'news_items_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            category_keywords: {
                Row: {
                    category_id: string;
                    created_at: string;
                    category_keyword_id: string;
                    keyword_name: string;
                };
                Insert: {
                    category_id?: string;
                    created_at?: string;
                    category_keyword_id?: string;
                    keyword_name: string;
                };
                Update: {
                    category_id?: string;
                    created_at?: string;
                    category_keyword_id?: string;
                    keyword_name?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'category_keyword_category_id_fkey';
                        columns: ['category_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_categories';
                        referencedColumns: ['category_id'];
                    },
                ];
            };
            species_keywords: {
                Row: {
                    species_id: string;
                    created_at: string;
                    species_keyword_id: string;
                    keyword_name: string;
                };
                Insert: {
                    species_id?: string;
                    created_at?: string;
                    species_keyword_id?: string;
                    keyword_name: string;
                };
                Update: {
                    speciesy_id?: string;
                    created_at?: string;
                    species_keyword_id?: string;
                    keyword_name?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'species_keyword_species_id_fkey';
                        columns: ['species_id'];
                        isOneToOne: false;
                        referencedRelation: 'news_species';
                        referencedColumns: ['species_id'];
                    },
                ];
            };
            posts: {
                Row: {
                    content: string;
                    created_at: string;
                    deteled_at: string | null;
                    img: string | null;
                    is_activated: boolean;
                    like: string;
                    post_id: string;
                    report_count: number;
                    title: string;
                    updated_at: string;
                    user_id: string;
                    view: string;
                };
                Insert: {
                    content: string;
                    created_at?: string;
                    deteled_at?: string | null;
                    img: string | null;
                    is_activated?: boolean;
                    like: string;
                    post_id?: string;
                    report_count?: number;
                    title: string;
                    updated_at?: string;
                    user_id?: string;
                    view: string;
                };
                Update: {
                    content?: string;
                    created_at?: string;
                    deteled_at?: string | null;
                    img?: string | null;
                    is_activated?: boolean;
                    like?: string;
                    post_id?: string;
                    report_count?: number;
                    title?: string;
                    updated_at?: string;
                    user_id?: string;
                    view?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'post_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            reports: {
                Row: {
                    comment: string;
                    comment_id: string;
                    created_at: string;
                    post_id: string;
                    report_id: string;
                    target_id: string;
                    target_type: string;
                    user_id: string;
                };
                Insert: {
                    comment: string;
                    comment_id?: string;
                    created_at?: string;
                    post_id?: string;
                    report_id?: string;
                    target_id?: string;
                    target_type: string;
                    user_id?: string;
                };
                Update: {
                    comment?: string;
                    comment_id?: string;
                    created_at?: string;
                    post_id?: string;
                    report_id?: string;
                    target_id?: string;
                    target_type?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'report_comment_id_fkey';
                        columns: ['comment_id'];
                        isOneToOne: false;
                        referencedRelation: 'comments';
                        referencedColumns: ['comment_id'];
                    },
                    {
                        foreignKeyName: 'report_post_id_fkey';
                        columns: ['post_id'];
                        isOneToOne: false;
                        referencedRelation: 'posts';
                        referencedColumns: ['post_id'];
                    },
                    {
                        foreignKeyName: 'report_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['user_id'];
                    },
                ];
            };
            users: {
                Row: {
                    create_at: string;
                    deleted_at: string;
                    email: string;
                    email_vaildation: string | null;
                    news_subscribe: boolean;
                    news_subscribe_type: string | null;
                    nickname: string;
                    phone: string | null;
                    proflie_image_url: string | null;
                    provider: string;
                    provider_id: string | null;
                    push_token: string | null;
                    role: string;
                    user_id: string;
                };
                Insert: {
                    create_at?: string;
                    deleted_at?: string;
                    email: string;
                    email_vaildation?: string | null;
                    news_subscribe: boolean;
                    news_subscribe_type?: string | null;
                    nickname: string;
                    phone?: string | null;
                    proflie_image_url?: string | null;
                    provider: string;
                    provider_id?: string | null;
                    push_token?: string | null;
                    role?: string;
                    user_id?: string;
                };
                Update: {
                    create_at?: string;
                    deleted_at?: string;
                    email?: string;
                    email_vaildation?: string | null;
                    news_subscribe?: boolean;
                    news_subscribe_type?: string | null;
                    nickname?: string;
                    phone?: string | null;
                    proflie_image_url?: string | null;
                    provider?: string;
                    provider_id?: string | null;
                    push_token?: string | null;
                    role?: string;
                    user_id?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
      ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema['CompositeTypes']
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
      ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never;
