--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg120+1)
-- Dumped by pg_dump version 14.13 (Debian 14.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Analytics; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Analytics" (
    id integer NOT NULL,
    "locationId" integer NOT NULL,
    date timestamp with time zone NOT NULL,
    "totalSales" double precision NOT NULL,
    "customerCount" integer NOT NULL,
    "averageTicket" double precision NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "metricType" character varying(255) NOT NULL,
    "testGroup" character varying(255),
    "conversionRate" double precision
);


ALTER TABLE public."Analytics" OWNER TO bryce;

--
-- Name: Analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Analytics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Analytics_id_seq" OWNER TO bryce;

--
-- Name: Analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Analytics_id_seq" OWNED BY public."Analytics".id;


--
-- Name: AuditLogs; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."AuditLogs" (
    id integer NOT NULL,
    action character varying(255) NOT NULL,
    details jsonb,
    "timestamp" timestamp with time zone DEFAULT now(),
    "userId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."AuditLogs" OWNER TO bryce;

--
-- Name: AuditLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."AuditLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AuditLogs_id_seq" OWNER TO bryce;

--
-- Name: AuditLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."AuditLogs_id_seq" OWNED BY public."AuditLogs".id;


--
-- Name: Brandings; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Brandings" (
    id integer NOT NULL,
    "primaryColor" character varying(255),
    "secondaryColor" character varying(255),
    "tertiaryColor" character varying(255),
    "fontColor" character varying(255),
    "secondaryFontColor" character varying(255),
    "fontFamily" character varying(255) DEFAULT 'Arial'::character varying,
    "logoUrl" character varying(255),
    "backgroundUrl" character varying(255),
    "faviconUrl" character varying(255),
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."Brandings" OWNER TO bryce;

--
-- Name: Brandings_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Brandings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Brandings_id_seq" OWNER TO bryce;

--
-- Name: Brandings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Brandings_id_seq" OWNED BY public."Brandings".id;


--
-- Name: CateringOrders; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."CateringOrders" (
    id integer NOT NULL,
    "guestId" integer NOT NULL,
    "houseAccountId" integer,
    "locationId" integer NOT NULL,
    "scheduledDate" timestamp with time zone NOT NULL,
    "totalPrice" double precision NOT NULL,
    "orderDetails" jsonb NOT NULL,
    status character varying(255) DEFAULT 'scheduled'::character varying NOT NULL,
    "deliveryMethod" character varying(255) NOT NULL,
    "driverTip" double precision,
    "kitchenTip" double precision,
    "cateringFees" jsonb,
    "commissaryKitchenId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "serviceFee" double precision,
    "packagingFee" double precision,
    "deliveryFee" double precision,
    "taxExempt" boolean DEFAULT false NOT NULL,
    "taxIdNumber" character varying(255)
);


ALTER TABLE public."CateringOrders" OWNER TO bryce;

--
-- Name: CateringOrders_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."CateringOrders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CateringOrders_id_seq" OWNER TO bryce;

--
-- Name: CateringOrders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."CateringOrders_id_seq" OWNED BY public."CateringOrders".id;


--
-- Name: Clients; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Clients" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "phoneNumber" character varying(255),
    address character varying(255),
    subdomain character varying(255) NOT NULL,
    "primaryColor" character varying(255) DEFAULT '#ff9800'::character varying NOT NULL,
    "secondaryColor" character varying(255) DEFAULT '#ff5722'::character varying NOT NULL,
    "accentColor" character varying(255) DEFAULT '#00bcd4'::character varying NOT NULL,
    branding jsonb,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "primaryFont" character varying(255) DEFAULT 'Roboto, sans-serif'::character varying NOT NULL,
    "secondaryFont" character varying(255) DEFAULT 'Open Sans, sans-serif'::character varying NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Clients" OWNER TO bryce;

--
-- Name: Clients_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Clients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clients_id_seq" OWNER TO bryce;

--
-- Name: Clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Clients_id_seq" OWNED BY public."Clients".id;


--
-- Name: Discounts; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Discounts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "vanityName" character varying(255),
    "vanityDescription" character varying(255),
    type character varying(255) NOT NULL,
    value double precision,
    conditions jsonb,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    "walletId" integer,
    "locationId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Discounts" OWNER TO bryce;

--
-- Name: Discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Discounts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Discounts_id_seq" OWNER TO bryce;

--
-- Name: Discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Discounts_id_seq" OWNED BY public."Discounts".id;


--
-- Name: GlobalSettings; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."GlobalSettings" (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GlobalSettings" OWNER TO bryce;

--
-- Name: GlobalSettings_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."GlobalSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GlobalSettings_id_seq" OWNER TO bryce;

--
-- Name: GlobalSettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."GlobalSettings_id_seq" OWNED BY public."GlobalSettings".id;


--
-- Name: Guests; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Guests" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    email character varying(255) NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "phoneNumber" character varying(255),
    "loyaltyPoints" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    "engagementScore" integer DEFAULT 0 NOT NULL,
    phone character varying(255)
);


ALTER TABLE public."Guests" OWNER TO bryce;

--
-- Name: Guests_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Guests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Guests_id_seq" OWNER TO bryce;

--
-- Name: Guests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Guests_id_seq" OWNED BY public."Guests".id;


--
-- Name: HouseAccounts; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."HouseAccounts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "clientId" integer NOT NULL,
    balance double precision DEFAULT '0'::double precision NOT NULL,
    "creditLimit" double precision,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."HouseAccounts" OWNER TO bryce;

--
-- Name: HouseAccounts_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."HouseAccounts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HouseAccounts_id_seq" OWNER TO bryce;

--
-- Name: HouseAccounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."HouseAccounts_id_seq" OWNED BY public."HouseAccounts".id;


--
-- Name: Locations; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Locations" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255),
    city character varying(255),
    state character varying(255),
    "zipCode" character varying(255),
    country character varying(255),
    "clientId" integer NOT NULL,
    "isOpen" boolean DEFAULT true,
    "diningOptions" character varying(255)[],
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Locations" OWNER TO bryce;

--
-- Name: Locations_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Locations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Locations_id_seq" OWNER TO bryce;

--
-- Name: Locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Locations_id_seq" OWNED BY public."Locations".id;


--
-- Name: LoyaltyRewards; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."LoyaltyRewards" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "pointsRequired" integer NOT NULL,
    type character varying(255) NOT NULL,
    value double precision,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."LoyaltyRewards" OWNER TO bryce;

--
-- Name: LoyaltyRewards_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."LoyaltyRewards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LoyaltyRewards_id_seq" OWNER TO bryce;

--
-- Name: LoyaltyRewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."LoyaltyRewards_id_seq" OWNED BY public."LoyaltyRewards".id;


--
-- Name: MenuGroups; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."MenuGroups" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "menuId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."MenuGroups" OWNER TO bryce;

--
-- Name: MenuGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."MenuGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MenuGroups_id_seq" OWNER TO bryce;

--
-- Name: MenuGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."MenuGroups_id_seq" OWNED BY public."MenuGroups".id;


--
-- Name: MenuItemModifiers; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."MenuItemModifiers" (
    id integer NOT NULL,
    "menuItemId" integer,
    "modifierId" integer,
    "isDefault" boolean DEFAULT false NOT NULL,
    removable boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MenuItemModifiers" OWNER TO bryce;

--
-- Name: MenuItemModifiers_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."MenuItemModifiers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MenuItemModifiers_id_seq" OWNER TO bryce;

--
-- Name: MenuItemModifiers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."MenuItemModifiers_id_seq" OWNED BY public."MenuItemModifiers".id;


--
-- Name: MenuItems; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."MenuItems" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price double precision NOT NULL,
    "menuGroupId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "posItemId" character varying(255),
    image character varying(255)
);


ALTER TABLE public."MenuItems" OWNER TO bryce;

--
-- Name: MenuItems_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."MenuItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MenuItems_id_seq" OWNER TO bryce;

--
-- Name: MenuItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."MenuItems_id_seq" OWNED BY public."MenuItems".id;


--
-- Name: Menus; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Menus" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "clientId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Menus" OWNER TO bryce;

--
-- Name: Menus_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Menus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Menus_id_seq" OWNER TO bryce;

--
-- Name: Menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Menus_id_seq" OWNED BY public."Menus".id;


--
-- Name: Modifiers; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Modifiers" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price double precision,
    "posModifierId" character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Modifiers" OWNER TO bryce;

--
-- Name: Modifiers_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Modifiers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Modifiers_id_seq" OWNER TO bryce;

--
-- Name: Modifiers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Modifiers_id_seq" OWNED BY public."Modifiers".id;


--
-- Name: Orders; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "orderDate" timestamp with time zone NOT NULL,
    "totalAmount" double precision NOT NULL,
    "guestId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "loyaltyPoints" integer DEFAULT 0 NOT NULL,
    discount double precision DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Orders" OWNER TO bryce;

--
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Orders_id_seq" OWNER TO bryce;

--
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- Name: PosProfiles; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."PosProfiles" (
    id integer NOT NULL,
    "locationId" integer,
    provider character varying(255) NOT NULL,
    "apiBaseUrl" character varying(255),
    "clientSecret" character varying(255),
    "contentType" character varying(255) DEFAULT 'application/json'::character varying,
    "roundingOption" character varying(255),
    "testProfile" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "syncFrequency" integer DEFAULT 24
);


ALTER TABLE public."PosProfiles" OWNER TO bryce;

--
-- Name: PosProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."PosProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PosProfiles_id_seq" OWNER TO bryce;

--
-- Name: PosProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."PosProfiles_id_seq" OWNED BY public."PosProfiles".id;


--
-- Name: Reports; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Reports" (
    id integer NOT NULL,
    "reportName" character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."Reports" OWNER TO bryce;

--
-- Name: Reports_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Reports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reports_id_seq" OWNER TO bryce;

--
-- Name: Reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Reports_id_seq" OWNED BY public."Reports".id;


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Roles" OWNER TO bryce;

--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_id_seq" OWNER TO bryce;

--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO bryce;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Users" OWNER TO bryce;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO bryce;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Wallets; Type: TABLE; Schema: public; Owner: bryce
--

CREATE TABLE public."Wallets" (
    id integer NOT NULL,
    balance double precision DEFAULT '0'::double precision NOT NULL,
    "guestId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Wallets" OWNER TO bryce;

--
-- Name: Wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: bryce
--

CREATE SEQUENCE public."Wallets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Wallets_id_seq" OWNER TO bryce;

--
-- Name: Wallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bryce
--

ALTER SEQUENCE public."Wallets_id_seq" OWNED BY public."Wallets".id;


--
-- Name: Analytics id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Analytics" ALTER COLUMN id SET DEFAULT nextval('public."Analytics_id_seq"'::regclass);


--
-- Name: AuditLogs id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."AuditLogs" ALTER COLUMN id SET DEFAULT nextval('public."AuditLogs_id_seq"'::regclass);


--
-- Name: Brandings id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Brandings" ALTER COLUMN id SET DEFAULT nextval('public."Brandings_id_seq"'::regclass);


--
-- Name: CateringOrders id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders" ALTER COLUMN id SET DEFAULT nextval('public."CateringOrders_id_seq"'::regclass);


--
-- Name: Clients id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Clients" ALTER COLUMN id SET DEFAULT nextval('public."Clients_id_seq"'::regclass);


--
-- Name: Discounts id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Discounts" ALTER COLUMN id SET DEFAULT nextval('public."Discounts_id_seq"'::regclass);


--
-- Name: GlobalSettings id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."GlobalSettings" ALTER COLUMN id SET DEFAULT nextval('public."GlobalSettings_id_seq"'::regclass);


--
-- Name: Guests id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Guests" ALTER COLUMN id SET DEFAULT nextval('public."Guests_id_seq"'::regclass);


--
-- Name: HouseAccounts id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."HouseAccounts" ALTER COLUMN id SET DEFAULT nextval('public."HouseAccounts_id_seq"'::regclass);


--
-- Name: Locations id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Locations" ALTER COLUMN id SET DEFAULT nextval('public."Locations_id_seq"'::regclass);


--
-- Name: LoyaltyRewards id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."LoyaltyRewards" ALTER COLUMN id SET DEFAULT nextval('public."LoyaltyRewards_id_seq"'::regclass);


--
-- Name: MenuGroups id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuGroups" ALTER COLUMN id SET DEFAULT nextval('public."MenuGroups_id_seq"'::regclass);


--
-- Name: MenuItemModifiers id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers" ALTER COLUMN id SET DEFAULT nextval('public."MenuItemModifiers_id_seq"'::regclass);


--
-- Name: MenuItems id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItems" ALTER COLUMN id SET DEFAULT nextval('public."MenuItems_id_seq"'::regclass);


--
-- Name: Menus id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Menus" ALTER COLUMN id SET DEFAULT nextval('public."Menus_id_seq"'::regclass);


--
-- Name: Modifiers id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Modifiers" ALTER COLUMN id SET DEFAULT nextval('public."Modifiers_id_seq"'::regclass);


--
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- Name: PosProfiles id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."PosProfiles" ALTER COLUMN id SET DEFAULT nextval('public."PosProfiles_id_seq"'::regclass);


--
-- Name: Reports id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Reports" ALTER COLUMN id SET DEFAULT nextval('public."Reports_id_seq"'::regclass);


--
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: Wallets id; Type: DEFAULT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Wallets" ALTER COLUMN id SET DEFAULT nextval('public."Wallets_id_seq"'::regclass);


--
-- Name: Analytics Analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Analytics"
    ADD CONSTRAINT "Analytics_pkey" PRIMARY KEY (id);


--
-- Name: AuditLogs AuditLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."AuditLogs"
    ADD CONSTRAINT "AuditLogs_pkey" PRIMARY KEY (id);


--
-- Name: Brandings Brandings_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Brandings"
    ADD CONSTRAINT "Brandings_pkey" PRIMARY KEY (id);


--
-- Name: CateringOrders CateringOrders_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT "CateringOrders_pkey" PRIMARY KEY (id);


--
-- Name: Clients Clients_email_key; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_email_key" UNIQUE (email);


--
-- Name: Clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);


--
-- Name: Clients Clients_subdomain_key; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_subdomain_key" UNIQUE (subdomain);


--
-- Name: Discounts Discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Discounts"
    ADD CONSTRAINT "Discounts_pkey" PRIMARY KEY (id);


--
-- Name: GlobalSettings GlobalSettings_key_key; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."GlobalSettings"
    ADD CONSTRAINT "GlobalSettings_key_key" UNIQUE (key);


--
-- Name: GlobalSettings GlobalSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."GlobalSettings"
    ADD CONSTRAINT "GlobalSettings_pkey" PRIMARY KEY (id);


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- Name: HouseAccounts HouseAccounts_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."HouseAccounts"
    ADD CONSTRAINT "HouseAccounts_pkey" PRIMARY KEY (id);


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- Name: LoyaltyRewards LoyaltyRewards_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."LoyaltyRewards"
    ADD CONSTRAINT "LoyaltyRewards_pkey" PRIMARY KEY (id);


--
-- Name: MenuGroups MenuGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuGroups"
    ADD CONSTRAINT "MenuGroups_pkey" PRIMARY KEY (id);


--
-- Name: MenuItemModifiers MenuItemModifiers_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers"
    ADD CONSTRAINT "MenuItemModifiers_pkey" PRIMARY KEY (id);


--
-- Name: MenuItems MenuItems_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItems"
    ADD CONSTRAINT "MenuItems_pkey" PRIMARY KEY (id);


--
-- Name: Menus Menus_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Menus"
    ADD CONSTRAINT "Menus_pkey" PRIMARY KEY (id);


--
-- Name: Modifiers Modifiers_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Modifiers"
    ADD CONSTRAINT "Modifiers_pkey" PRIMARY KEY (id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: PosProfiles PosProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."PosProfiles"
    ADD CONSTRAINT "PosProfiles_pkey" PRIMARY KEY (id);


--
-- Name: Reports Reports_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Reports"
    ADD CONSTRAINT "Reports_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_name_key; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Wallets Wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_pkey" PRIMARY KEY (id);


--
-- Name: Analytics Analytics_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Analytics"
    ADD CONSTRAINT "Analytics_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AuditLogs AuditLogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."AuditLogs"
    ADD CONSTRAINT "AuditLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CateringOrders CateringOrders_commissaryKitchenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT "CateringOrders_commissaryKitchenId_fkey" FOREIGN KEY ("commissaryKitchenId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CateringOrders CateringOrders_guestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT "CateringOrders_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES public."Guests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CateringOrders CateringOrders_houseAccountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT "CateringOrders_houseAccountId_fkey" FOREIGN KEY ("houseAccountId") REFERENCES public."HouseAccounts"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CateringOrders CateringOrders_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT "CateringOrders_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Discounts Discounts_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Discounts"
    ADD CONSTRAINT "Discounts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Discounts Discounts_walletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Discounts"
    ADD CONSTRAINT "Discounts_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES public."Wallets"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Guests Guests_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: HouseAccounts HouseAccounts_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."HouseAccounts"
    ADD CONSTRAINT "HouseAccounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Locations Locations_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MenuGroups MenuGroups_menuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuGroups"
    ADD CONSTRAINT "MenuGroups_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES public."Menus"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MenuItemModifiers MenuItemModifiers_menuItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers"
    ADD CONSTRAINT "MenuItemModifiers_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES public."MenuItems"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MenuItemModifiers MenuItemModifiers_modifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers"
    ADD CONSTRAINT "MenuItemModifiers_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES public."Modifiers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MenuItems MenuItems_menuGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItems"
    ADD CONSTRAINT "MenuItems_menuGroupId_fkey" FOREIGN KEY ("menuGroupId") REFERENCES public."MenuGroups"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Menus Menus_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Menus"
    ADD CONSTRAINT "Menus_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id);


--
-- Name: Orders Orders_guestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES public."Guests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Orders Orders_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PosProfiles PosProfiles_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."PosProfiles"
    ADD CONSTRAINT "PosProfiles_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users Users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Wallets Wallets_guestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES public."Guests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CateringOrders fk_catering_orders_guest; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT fk_catering_orders_guest FOREIGN KEY ("guestId") REFERENCES public."Guests"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CateringOrders fk_catering_orders_house_account; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT fk_catering_orders_house_account FOREIGN KEY ("houseAccountId") REFERENCES public."HouseAccounts"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CateringOrders fk_catering_orders_location; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."CateringOrders"
    ADD CONSTRAINT fk_catering_orders_location FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MenuItemModifiers fk_menuItemModifier_menuItem; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers"
    ADD CONSTRAINT "fk_menuItemModifier_menuItem" FOREIGN KEY ("menuItemId") REFERENCES public."MenuItems"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MenuItemModifiers fk_menuItemModifier_modifier; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."MenuItemModifiers"
    ADD CONSTRAINT "fk_menuItemModifier_modifier" FOREIGN KEY ("modifierId") REFERENCES public."Modifiers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PosProfiles fk_pos_profiles_location; Type: FK CONSTRAINT; Schema: public; Owner: bryce
--

ALTER TABLE ONLY public."PosProfiles"
    ADD CONSTRAINT fk_pos_profiles_location FOREIGN KEY ("locationId") REFERENCES public."Locations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

