--
-- PostgreSQL database dump
--

-- Dumped from database version 11.19 (Ubuntu 11.19-1.pgdg20.04+1)
-- Dumped by pg_dump version 11.19 (Ubuntu 11.19-1.pgdg20.04+1)

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

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


--
--

CREATE TYPE public."educationLevel" AS ENUM (
    'NoSchooling',
    'SomeHighSchoolOrLess',
    'HighSchoolGraduateGED',
    'SomeCollege',
    'AssociatesDegree',
    'BachelorsDegree',
    'SomeGraduateSchool',
    'MastersDegree',
    'DoctoralDegree'
);



--
--

CREATE TYPE public.grades AS ENUM (
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Freshman',
    'Sophomore',
    'Junior',
    'Senior'
);



--
--

CREATE TYPE public."housingStatus" AS ENUM (
    'Rent',
    'Own',
    'CurrentlyDisplaced'
);



--
--

CREATE TYPE public.student_gender_enum AS ENUM (
    'Male',
    'Female',
    'NonBinary',
    'PreferNotToSay'
);



--
--

CREATE TYPE public."veteranStatus" AS ENUM (
    'NotAVeteran',
    'BelongToSeveralClassifications',
    'NotProtectedVeteran',
    'ChooseNotToIdentify'
);



SET default_tablespace = '';

SET default_with_oids = false;

--
--

CREATE TABLE IF NOT EXISTS public.admin (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "phoneNumber" character varying
);



--
--

CREATE TABLE IF NOT EXISTS public.classes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying NOT NULL
);



--
--

CREATE TABLE IF NOT EXISTS public.demographic_info (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "zipCode" character varying NOT NULL,
    address character varying NOT NULL,
    "foodStampEligible" boolean NOT NULL,
    ethnicity character varying NOT NULL,
    "householdIncome" character varying NOT NULL,
    "disclaimerAccepted" character varying NOT NULL
);



--
--

CREATE TABLE IF NOT EXISTS public.events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    start_time timestamp(3) without time zone NOT NULL,
    end_time timestamp(3) without time zone NOT NULL,
    instructor text,
    "classId" text NOT NULL,
    event_date timestamp(3) without time zone NOT NULL,
    location text NOT NULL
);



--
--

CREATE TABLE IF NOT EXISTS public.parent (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "fName" character varying NOT NULL,
    "lName" character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    birthday date NOT NULL,
    "educationLevel" public."educationLevel" NOT NULL,
    "veteranStatus" public."veteranStatus" NOT NULL,
    "regularTransportation" boolean NOT NULL,
    "housingStatus" public."housingStatus" NOT NULL,
    "demographicInfoId" uuid,
    "salesforceId" character varying
);



--
--

CREATE TABLE IF NOT EXISTS public.student (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "fName" character varying NOT NULL,
    "lName" character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    birthday date NOT NULL,
    grade public.grades NOT NULL,
    "schoolName" character varying NOT NULL,
    gender public.student_gender_enum NOT NULL,
    "zipCode" character varying NOT NULL,
    "parentId" uuid,
    "salesforceId" character varying,
    "emergencyContact" text,
    "profileImagePublicId" text,
    "profileImageSecureUrl" text
);



--
--

CREATE TABLE IF NOT EXISTS public.student_knowledge (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    grade character varying,
    skills character varying,
    "studentId" uuid NOT NULL,
    "classId" uuid NOT NULL,
    verify boolean DEFAULT false NOT NULL,
    "verifiedDate" timestamp(3) without time zone,
    "adminId" uuid,
    date timestamp(3) without time zone NOT NULL
);



--
--

COPY public.admin (id, name, email, password, created_at, updated_at, "isAdmin", "phoneNumber") FROM stdin;
9c371671-329e-4568-90df-5a7e7477da12	Adrienne Story	adrienne.story@wecodekc.org	$2b$10$WYMHRLickO.CikGPEoj/R.9V4fsK/iFhVexCpDrgUaDgTA39TNVIS	2024-02-03 18:10:27.396	2024-02-03 18:10:27.396	t	\N
f813ab34-a1eb-446a-aaf9-b5811c46e93b	Test2	test2@email.com	$2b$12$86J5iENbETdxo/Mp1IMe9eOZJPoYKpO6.0zaAUl6dmQZFoGR3vwlG	2024-02-15 20:42:14.209	2024-02-15 20:42:14.209	f	5554441515
2bc3543a-d6e0-4212-b9ce-e4b8e31ced83	Olamide Simon	olamide@gmail.com	$2b$12$DieTHrTJmNqpBnydlB1EheA.1Aj2IxxAu7SeLNz9rg2guZKuePcFq	2024-02-10 19:32:36.318	2024-02-10 19:32:36.318	f	3894389433
d073cb9a-d4e1-44c5-b75c-597dfb40c05d	Test Admin Add	testadminadd@email.com	$2b$12$sAi6zkMNxf8wNuXjWo5e0uoGUoglEG642kRP3FI1bHfi99WmJQUO.	2024-02-15 19:48:53.49	2024-02-15 19:48:53.49	f	1115554444
\.


--
--

COPY public.classes (id, created_at, updated_at, name) FROM stdin;
4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-02-08 00:39:12.275	2024-02-08 00:39:12.275	Web Development
01453bc6-dc3d-4793-8351-1cc554bc9729	2024-02-08 00:39:29.018	2024-02-08 00:39:29.018	Python
b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-02-08 00:39:40.309	2024-02-08 00:39:40.309	Roblox
c74d0a1a-2b6f-4b25-a9ad-900cba5c35b1	2024-02-08 00:39:52.759	2024-02-08 00:39:52.759	Scratch
de7a35b4-5081-4495-b6e8-553ca2373683	2024-02-08 21:38:48.063	2024-02-08 21:38:48.063	Advanced Python
d8686f52-c9bf-465e-9ab7-87cf1beb1ef2	2024-02-08 21:41:45.415	2024-02-08 21:41:45.415	Advanced Scratch
061c8d81-2ecf-4a30-ad5b-eb912e4f9fa2	2024-02-08 21:47:53.872	2024-02-08 21:47:53.872	Advanced Roblox
a709c002-b5bb-4536-882c-80cdbb863e68	2024-02-27 00:03:00.247	2024-02-27 00:03:00.247	FTC
b16b3883-8e97-41dd-a55a-040c1a0261f3	2024-02-27 00:12:53.629	2024-02-27 00:12:53.629	EarSketch Using Python
db852930-9a8e-4372-9f3c-675e7095177e	2024-02-27 00:13:38.654	2024-02-27 00:13:38.654	Spring Into Code
973e91f0-b868-493c-b437-b142dd525462	2024-02-27 00:16:07.203	2024-02-27 00:16:07.203	Unity
5548805a-69e4-481c-8463-bb49bea1c330	2024-02-29 19:12:37.516	2024-02-29 19:12:37.516	For Testing ONLY
\.


--
--

COPY public.demographic_info (id, created_at, updated_at, "zipCode", address, "foodStampEligible", ethnicity, "householdIncome", "disclaimerAccepted") FROM stdin;
a61715b6-72da-47cc-a6b6-6307c3d5c020	2024-01-12 17:02:57.841	2024-01-12 17:02:57.841	64111	1300 West 49th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
25f82f41-54bd-4436-b71a-3ec25ae60be7	2024-01-12 17:15:49.042	2024-01-12 17:15:49.042	64444	1800 West	f	Hispanic	50000-60000	Yes
fa06f11d-c159-4384-a55f-c3075b470bc0	2024-01-12 17:20:04.431	2024-01-12 17:20:04.431	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
a7c5ec63-078f-44e7-893e-2b296ad8781f	2024-01-12 17:20:20.028	2024-01-12 17:20:20.028	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
c3d91ea2-6d1c-455d-bb9b-b7adb2596540	2024-01-12 17:20:28.332	2024-01-12 17:20:28.332	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
3be5e60b-be4b-4fb5-a70d-48f92268bdc1	2024-01-12 17:46:28.929	2024-01-12 17:46:28.929	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
3e7d178c-547f-486a-9459-ef2fa09344b4	2024-01-12 17:46:49.738	2024-01-12 17:46:49.738	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
5ad7e1c4-7514-40ff-8450-49452b44a6f8	2024-01-12 17:46:58.434	2024-01-12 17:46:58.434	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
57cdd276-003c-435a-aeb5-769e00233caf	2024-01-12 17:47:21.833	2024-01-12 17:47:21.833	64111	1300 West 49th Street	t	American Indian or Alaskan Native	40000	Yes
f1e6b127-9b0e-46ce-afae-860a5d3ac8eb	2024-01-12 17:50:26.837	2024-01-12 17:50:26.837	64111	1300 West 44th Street	t	American Indian or Alaskan Native	20000	Yes
778f8b38-9767-45fa-8260-df77648e1c7a	2024-01-12 17:54:11.737	2024-01-12 17:54:11.737	64111	1300 West 43th Street	f	Hispanic/Latino/Spanish Origin of any race	40000	Yes
13757740-f44b-4c03-ab1a-a9ef2326623f	2024-01-12 18:29:07.159	2024-01-12 18:29:07.159	64111	1300 West 43th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
3023e05f-ef96-4407-8607-3ea88c3124e8	2024-01-12 18:30:18.03	2024-01-12 18:30:18.03	64111	1300 West 43th Street	t	Asian	40000	Yes
defd36c7-f2fb-419c-b8c0-4f25ae1e3449	2024-01-12 18:38:56.129	2024-01-12 18:38:56.129	64111	1300 West 43th Street	t	Asian	40000	Yes
64e1441d-e199-4d41-99d0-6438f71d78e2	2024-01-12 18:39:32.13	2024-01-12 18:39:32.13	64111	1300 West 43th Street	t	Asian	40000	Yes
c038275a-7b6c-4cf4-ba19-f3b8a8dd24a4	2024-01-17 19:52:21.151	2024-01-17 19:52:21.151	64157	5008 Prospect Ave	f	Black or African American	60000	Yes
5570513b-6e4d-4f1a-a17a-b00d93b2e2ee	2024-01-12 19:32:02.767	2024-01-12 19:32:02.767	64111	1300 West 47th Street	t	American Indian or Alaskan Native	60000	Yes
ff7a4aac-83f2-40f6-8ef2-151971964ebf	2024-01-12 19:41:02.068	2024-01-12 19:41:02.068	64111	1300 West 45th Street	f	American Indian or Alaskan Native	40000	Yes
36343c3f-9216-4bce-93c2-6ad1a6138ef1	2024-01-12 19:50:39.971	2024-01-12 19:50:39.971	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	60000	Yes
187e72bf-b3bc-4cc8-981f-886265d31a5e	2024-01-12 23:06:28.712	2024-01-12 23:06:28.712	64111	1300 West 43th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
306d8d51-a94c-4cfa-af3e-f058723143a5	2024-01-12 23:10:12.098	2024-01-12 23:10:12.098	64111	1300 West 45th Street	f	Hispanic/Latino/Spanish Origin of any race	60000	Yes
c87acfc0-c307-4bfc-b7eb-cbfa4c57ae5d	2024-01-13 03:14:00.61	2024-01-13 03:14:00.61	64111	1300 West 42th Street	t	American Indian or Alaskan Native	20000	Yes
76bb2959-ff19-491b-952f-54508ff7746c	2024-01-13 03:36:15.227	2024-01-13 03:36:15.227	64111	1300 West 43th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
2e80370d-2e4a-43f7-8cc5-d53d170eac5e	2024-01-13 03:56:17.901	2024-01-13 03:56:17.901	64111	1300 West 45th Street	f	American Indian or Alaskan Native	20000	Yes
8967fd90-d635-419e-a95e-68d121cf9268	2024-01-13 04:14:46.199	2024-01-13 04:14:46.199	64111	1300 West 47th Street	f	Hispanic/Latino/Spanish Origin of any race	20000	Yes
f1f24686-23a2-4988-bcf8-46313bd41501	2024-01-13 16:13:39.931	2024-01-13 16:13:39.931	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
26711c6f-4dd8-44ed-8201-21dfa17b1602	2024-01-13 16:21:56.139	2024-01-13 16:21:56.139	64111	1300 West 45th Street	t	American Indian or Alaskan Native	40000	Yes
8c92a059-b3a1-45bf-8c53-6688f14a6e1d	2024-01-13 18:20:14.188	2024-01-13 18:20:14.188	64068	123 Conch St.	f	American Indian or Alaskan Native	60000	Yes
002497f0-8c73-4fa1-a4f2-00e05a1ebd66	2024-01-13 18:23:50.448	2024-01-13 18:23:50.448	12345	123 Street	t	White	60000	Yes
a5458f74-a575-47d1-9dc3-0debe376bc3f	2024-01-13 18:33:35.249	2024-01-13 18:33:35.249	64068	你好中国！St.	f	Two or more races	40000	Yes
95773a5f-2bd4-4500-80d5-1b5435511ef3	2024-01-13 18:33:40.952	2024-01-13 18:33:40.952	64082	123 Cole St	t	American Indian or Alaskan Native	60000	Yes
f3d0e4d8-f431-4b91-b74d-7ec5fcbae2fe	2024-01-13 18:44:38.854	2024-01-13 18:44:38.854	64082	1234 SE Cole Dr	t	Asian	60000	Yes
de9f4298-2624-4f85-a287-881d2911715a	2024-01-13 18:44:58.774	2024-01-13 18:44:58.774	64082	1234 SE Cole Dr	t	Asian	60000	Yes
ecdfecdb-9929-412c-8ced-76c4d28c74dd	2024-01-13 18:58:19.055	2024-01-13 18:58:19.055	64082	1234 NW Street	t	Black or African American	60000	Yes
8ddbf6f7-5570-41cb-8f22-4dc7674a1673	2024-01-13 19:22:57.952	2024-01-13 19:22:57.952	12345	123 Street	t	White	40000	Yes
6d336d6c-c6eb-409f-9a2f-3bc4e44dab23	2024-01-13 19:23:19.051	2024-01-13 19:23:19.051	12345	123 Street	t	White	40000	Yes
8271dfe4-fdcf-4cd9-afb4-576fa9b6d676	2024-01-13 20:41:22.492	2024-01-13 20:41:22.492	64111	1300 West 45th Street	t	Native Hawaiian or Other Pacific Islander	20000	Yes
8d57b2c5-6c66-4003-91be-dc8466881405	2024-01-13 20:55:05.159	2024-01-13 20:55:05.159	64111	1300 West 49th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
bc953a6b-c682-496b-ba2f-df5cd134a38a	2024-01-13 20:57:26.656	2024-01-13 20:57:26.656	64111	1300 West 44th Street	f	Hispanic/Latino/Spanish Origin of any race	40000	Yes
5048ab9d-b88c-4cd1-96b2-53a9e15a96db	2024-01-13 21:00:21.555	2024-01-13 21:00:21.555	64111	1300 West 43th Street	t	American Indian or Alaskan Native	20000	Yes
c4f19cf4-350a-4beb-abbc-c62955261782	2024-01-13 21:07:15.962	2024-01-13 21:07:15.962	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
3e8e2f12-4826-4f59-ac99-1f85c2a49c39	2024-01-13 21:50:20.851	2024-01-13 21:50:20.851	64111	1300 West 44th Street	t	American Indian or Alaskan Native	20000	Yes
369c8b7b-a55c-4450-870c-9b640ca01d3b	2024-01-14 06:47:30.169	2024-01-14 06:47:30.169	64111	1300 West 44th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
e1d2a9a7-0723-41e0-81c4-70065dc146fd	2024-01-14 22:28:20.376	2024-01-14 22:28:20.376	64111	1300 West 44th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
18ec23d3-1d7d-48cf-a789-88c254009709	2024-01-14 23:22:12.14	2024-01-14 23:22:12.14	64111	1300 West 42th Street	f	Hispanic/Latino/Spanish Origin of any race	20000	Yes
205600ce-727f-4729-9f9d-0248aea98949	2024-01-15 15:38:26.994	2024-01-15 15:38:26.994	64111	1300 West 43th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
8ce0d64f-a3aa-46c5-b39c-db1ae566772a	2024-01-15 16:00:57.014	2024-01-15 16:00:57.014	64111	1300 West 43th Street	f	American Indian or Alaskan Native	40000	Yes
ce15b965-a34a-4224-90d4-2a6787a59c13	2024-01-15 16:24:08.614	2024-01-15 16:24:08.614	64111	1300 West 43th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
6fa93675-1b95-4188-a178-61900e5e87e5	2024-01-15 21:22:24.17	2024-01-15 21:22:24.17	64111	1300 West 44th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
dc7c1bbf-bee2-4d42-8c3a-3a1262e55648	2024-01-15 22:01:06.394	2024-01-15 22:01:06.394	64111	1300 West 43th Street	t	American Indian or Alaskan Native	40000	Yes
76ac8194-60d4-4485-9fd6-fffd8ac3477b	2024-01-16 17:19:23.627	2024-01-16 17:19:23.627	64057	3125 S Cedar Crest Ct	f	Black or African American	80000	Yes
ab7f0427-d477-4ae3-b32e-358221636fec	2024-01-16 17:19:30.392	2024-01-16 17:19:30.392	64057	3125 S Cedar Crest Ct	f	Black or African American	80000	Yes
06987003-05db-4fdf-a0b2-674549aa12c4	2024-01-16 20:13:57.618	2024-01-16 20:13:57.618	64111	1300 West 44th Street	f	American Indian or Alaskan Native	40000	Yes
634ffd65-6298-438c-8e59-44e84703de26	2024-01-16 20:18:18.635	2024-01-16 20:18:18.635	64111	1300 West 44th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
be759f42-a300-4bd6-b82a-abf63c8a3a6a	2024-01-17 19:52:23.113	2024-01-17 19:52:23.113	64157	5008 Prospect Ave	f	Black or African American	60000	Yes
e35d8ba7-cdca-4924-98bf-e46776a7ef3d	2024-01-17 19:53:14.921	2024-01-17 19:53:14.921	64132	7312 Myrtle Ave	f	Black or African American	40000	Yes
139d8771-3a4c-4e45-97b3-d6890a5894cd	2024-01-17 19:53:48.014	2024-01-17 19:53:48.014	64157	5008 Prospect Ave	f	Black or African American	60000	Yes
238ef043-40d3-4479-b845-622f455326a7	2024-01-17 20:02:05.828	2024-01-17 20:02:05.828	64082	1908 SW Sage Canyon Rd	f	Black or African American	80000	Yes
3a749933-9fbf-4bb1-b8c5-f08553f99ce1	2024-01-18 18:11:43.962	2024-01-18 18:11:43.962	64131	9999 Holmes Rd., Kansas City, Missouri	f	Black or African American	80000	Yes
1fe5783a-3507-4102-8846-b09c611c8ee2	2024-01-18 18:11:44.971	2024-01-18 18:11:44.971	64131	9999 Holmes Rd., Kansas City, Missouri	f	Black or African American	80000	Yes
d1f55fd2-5f17-44d6-af54-44d222e2e2c8	2024-01-18 18:12:56.868	2024-01-18 18:12:56.868	64110	4825 Troost Avenue	f	Black or African American	60000	Yes
5edf405f-23f7-4318-90f9-4b8972cb0315	2024-01-18 18:26:41.562	2024-01-18 18:26:41.562	64110	4825 Troost Avenue	f	Black or African American	60000	Yes
792b1a65-93d8-4b13-8eb5-7e5130396c86	2024-01-18 18:26:42.369	2024-01-18 18:26:42.369	64110	4825 Troost Avenue	f	Black or African American	60000	Yes
ca794e66-964a-43d2-9b54-f2669a859e8b	2024-01-18 18:35:11.461	2024-01-18 18:35:11.461	64110	500 E 20th 	f	Black or African American	80000	Yes
0e435145-ec82-4821-9f5c-8ceee185eff7	2024-01-20 14:43:28.867	2024-01-20 14:43:28.867	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	60000	Yes
8240112b-ac2d-4430-a74a-ab15e87fbcc7	2024-01-20 19:48:52.882	2024-01-20 19:48:52.882	12345	123 Street	t	White	40000	Yes
79bcf982-72ca-4fee-a614-33036e7d488e	2024-01-20 19:51:40.585	2024-01-20 19:51:40.585	64068	14 Rafaella Ave.	f	American Indian or Alaskan Native	60000	Yes
bf323aa9-7391-496c-9b79-bdbd487e3d5b	2024-01-23 00:37:46.553	2024-01-23 00:37:46.553	64068	1400 Street St.	t	Native Hawaiian or Other Pacific Islander	40000	Yes
badbbf37-0b7e-4286-a024-f003e9fc29a5	2024-01-27 18:57:56.751	2024-01-27 18:57:56.751	64082-3817	1908 Sw Sage Canyon Rd	f	American Indian or Alaskan Native	60000	Yes
e77fdb9a-8f18-40b1-9de3-5d0bd2c338af	2024-01-27 19:07:37.923	2024-01-27 19:07:37.923	64082	1234 SE Street	f	American Indian or Alaskan Native	20000	Yes
256e8334-6fd3-4735-96f2-551bf5739029	2024-01-27 19:43:33.981	2024-01-27 19:43:33.981	64138	1234 Street	f	Two or more races	60000	Yes
d755bd9f-daf7-49f2-981b-289a38042890	2024-01-29 21:44:20.168	2024-01-29 21:44:20.168	14024	1300 West Baltimore	t	Black or African American	80000	Yes
1910ac2b-5aa7-44fa-8785-e077a92ff0f4	2024-01-29 21:47:41.573	2024-01-29 21:47:41.573	64111	1300 West Baltimore	f	Asian	20000	Yes
a632c0b6-30b1-441a-a4c5-f6641bb6437f	2024-01-29 21:49:08.17	2024-01-29 21:49:08.17	64111	1300 West 45th Street	t	White	20000	Yes
03b6ed17-1a57-41ee-a5bf-5e0e55e6a5b4	2024-01-29 21:53:42.972	2024-01-29 21:53:42.972	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	20000	Yes
64753766-11e4-45cb-9045-4be24aab2718	2024-01-29 23:10:24.326	2024-01-29 23:10:24.326	64138	1256 Street 	f	American Indian or Alaskan Native	40000	Yes
fbba30ac-40f6-4ff4-8956-6fe988097082	2024-01-29 23:10:27.614	2024-01-29 23:10:27.614	64138	1256 Street 	f	American Indian or Alaskan Native	40000	Yes
b11f11f6-3d25-488f-bcf9-cfc5d3ace69b	2024-02-02 20:03:44.763	2024-02-02 20:03:44.763	64111	1300 West 5th	f	Hispanic/Latino/Spanish Origin of any race	40000	Yes
6026ce82-50cb-41eb-869f-07358bd10e4a	2024-02-03 17:38:28.462	2024-02-03 17:38:28.462	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
1ca8b059-13ea-490a-83d5-d4eee49b1a1e	2024-02-06 00:55:27.045	2024-02-06 00:55:27.045	64082	123 crest drive	f	Hispanic/Latino/Spanish Origin of any race	60000	Yes
674964cf-ed54-4d71-afb6-181d958ca3e4	2024-02-06 20:03:38.394	2024-02-06 20:03:38.394	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
7864bdc3-f0a4-49a1-a211-77c037637b22	2024-02-10 19:28:40.051	2024-02-10 19:28:40.051	64068	123 Fleet Street	t	American Indian or Alaskan Native	40000	Yes
2d08da9b-7cf3-4753-9141-e3954b90d99d	2024-02-15 23:10:04.931	2024-02-15 23:10:04.931	66112	1827 N 75th dr	f	Black or African American	40000	Yes
5f97d4a5-c414-4d07-997f-161c24c1819b	2024-02-17 16:55:51.654	2024-02-17 16:55:51.654	64152	8700 River park drive	f	Black or African American	20000	Yes
794e72a7-6969-499b-8f44-886401d6619b	2024-03-02 19:07:53.647	2024-03-02 19:07:53.647	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
07153adb-a0ef-4e4c-a8cc-8481f4023539	2024-03-02 19:08:13.546	2024-03-02 19:08:13.546	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
d4af2393-a636-4f74-94b8-c109c9f4daa6	2024-03-02 19:09:39.841	2024-03-02 19:09:39.841	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
c071ace7-dd21-47ac-b600-180bb57df5ac	2024-03-02 19:11:22.252	2024-03-02 19:11:22.252	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
994fea49-96e6-4caf-bfc5-bd0f40d75e20	2024-03-02 19:12:18.547	2024-03-02 19:12:18.547	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
288a17dc-8c55-4d53-89dd-50720f028142	2024-03-02 19:12:20.143	2024-03-02 19:12:20.143	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
10194020-eeba-4be8-b39c-c2c9e5953f3a	2024-03-02 19:12:40.349	2024-03-02 19:12:40.349	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
40e5bdf2-a789-40ad-9c22-e17f91dcc83b	2024-03-02 19:12:59.654	2024-03-02 19:12:59.654	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
92db97c3-d180-4a63-beb8-ab438b5cdadc	2024-03-02 19:20:11.649	2024-03-02 19:20:11.649	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
a8a6f51a-ca3f-4bda-bd33-ba4741445356	2024-03-02 19:22:29.541	2024-03-02 19:22:29.541	64082-4903	4020 SW Meritage Ln	f	Black or African American	60000	Yes
9635e7e2-ab91-4527-a42f-cdd93465ce67	2024-03-07 00:04:21.656	2024-03-07 00:04:21.656	64105	123 Walnut	t	American Indian or Alaskan Native	20000	Yes
bfa1a63b-0d0e-44d2-a81a-7d6c363b5bae	2024-03-09 04:28:15.604	2024-03-09 04:28:15.604	64056	20016 E 17th St Ct N	f	White	80000	Yes
dd2f2a8e-95fa-4aef-a316-fc8ed18da34b	2024-03-19 21:51:42.936	2024-03-19 21:51:42.936	64111	1300 West 45th Street	f	American Indian or Alaskan Native	40000	Yes
cf355477-cd35-4c13-83fb-ed6e99e2290d	2024-03-20 23:10:52.503	2024-03-20 23:10:52.503	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
3ce4e41e-db5f-4460-a1c9-d41f71ab2c03	2024-03-20 23:11:03.499	2024-03-20 23:11:03.499	64068	123 Conch St.	t	Asian	40000	Yes
cc1b208e-87d4-4297-8103-fac327427eac	2024-02-06 20:04:20.898	2024-02-06 20:04:20.898	64111	1300 West 45th Street	t	Hispanic/Latino/Spanish Origin of any race	40000	Yes
\.


--
--

COPY public.events (id, created_at, updated_at, start_time, end_time, instructor, "classId", event_date, location) FROM stdin;
147d82a7-1e96-49af-b5f0-bbdfc9f905d5	2024-02-22 21:45:19.781	2024-02-22 21:45:19.781	1970-01-01 00:00:00	1970-01-01 00:00:00	Me	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	1970-01-01 00:00:00	InPerson
fc36f214-eeb7-462d-b16b-a115aebed6a4	2024-02-22 22:28:03.737	2024-02-22 22:28:03.737	2024-02-22 00:39:12.275	2024-02-22 02:39:12.275	TD	01453bc6-dc3d-4793-8351-1cc554bc9729	2024-02-22 00:39:12.275	InPerson
9ddd72ab-aca8-459b-8b18-4545ec7f6387	2024-02-23 04:27:50.731	2024-02-23 04:27:50.731	2024-02-22 00:39:12.275	2024-02-22 02:39:12.275	TD	c74d0a1a-2b6f-4b25-a9ad-900cba5c35b1	2024-02-22 00:39:12.275	InPerson
7cf1c043-dea0-4931-bc2f-3b3d1dd35a1d	2024-02-23 20:07:33.556	2024-02-23 20:07:33.556	2024-02-24 16:00:00	2024-02-24 18:00:00	Teacher	061c8d81-2ecf-4a30-ad5b-eb912e4f9fa2	2024-02-24 00:00:00	InPerson
5400ef8a-5918-491f-9efd-551e73e60c52	2024-02-23 20:12:45.159	2024-02-23 20:12:45.159	2024-02-24 16:00:00	2024-02-24 18:00:00	Teacher	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-02-24 00:00:00	InPerson
87c8b56b-ebc3-400a-b0a6-d8511657e1c4	2024-02-23 20:24:13.656	2024-02-23 20:24:13.656	2024-02-24 16:00:00	2024-02-24 18:00:00	Advanced Scratch Teacher	d8686f52-c9bf-465e-9ab7-87cf1beb1ef2	2024-02-24 00:00:00	InPerson
b7d49221-4c5b-49ad-b8dd-04df33f255b7	2024-02-26 23:40:26.151	2024-02-26 23:40:26.151	2024-01-08 23:00:00	2024-01-09 01:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-01-08 00:00:00	virtual
ac85a18c-97bb-4478-b871-781d3ac57dcb	2024-02-26 23:50:13.82	2024-02-26 23:50:13.82	2024-04-01 22:00:00	2024-04-02 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-01 00:00:00	virtual
7ee3b0db-5d59-47c2-9b8e-73372006403a	2024-02-26 23:51:12.922	2024-02-26 23:51:12.922	2024-04-03 22:00:00	2024-04-04 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-03 00:00:00	virtual
1e6dc925-ee22-497f-a91c-6f4fd2a39661	2024-02-26 23:54:22.718	2024-02-26 23:54:22.718	2024-03-02 16:00:00	2024-03-02 20:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-02 00:00:00	virtual
889604b8-6887-49e5-b49d-42eea4ad912d	2024-02-26 23:55:05.588	2024-02-26 23:55:05.588	2024-04-13 15:00:00	2024-04-13 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-13 00:00:00	virtual
fc8ea016-cdaa-4937-9843-03641405a35e	2024-02-26 23:58:13.993	2024-02-26 23:58:13.993	2024-04-06 15:00:00	2024-04-06 17:00:00	Antonio Cea	d8686f52-c9bf-465e-9ab7-87cf1beb1ef2	2024-04-06 00:00:00	InPerson
b05f998e-1513-4136-ad95-6d1f39bfcd2d	2024-02-27 00:00:29.86	2024-02-27 00:00:29.86	2024-01-08 23:00:00	2024-01-09 01:00:00	None	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-01-08 00:00:00	virtual
4bdf88a1-0628-4c68-8860-b2e2851091c3	2024-02-27 00:00:52.014	2024-02-27 00:00:52.014	2024-04-06 15:00:00	2024-04-06 17:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-04-06 00:00:00	InPerson
699d787a-9d43-4392-b9ff-16ac1c02db51	2024-02-27 00:01:22.489	2024-02-27 00:01:22.489	2024-04-06 15:00:00	2024-04-06 17:00:00	Matt Bar	de7a35b4-5081-4495-b6e8-553ca2373683	2024-04-06 00:00:00	InPerson
b9136968-2692-497c-9c98-d9b91305b67c	2024-02-27 00:02:13.517	2024-02-27 00:02:13.517	2024-04-08 22:00:00	2024-04-09 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-08 00:00:00	virtual
9362c8d0-d688-4a39-844d-466e159e0fdf	2024-02-27 00:02:51.076	2024-02-27 00:02:51.076	2024-04-10 22:00:00	2024-04-11 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-10 00:00:00	virtual
b0738de0-5497-4fc1-b9f9-22d4ff80a093	2024-02-27 00:03:40.683	2024-02-27 00:03:40.683	2024-04-03 22:00:00	2024-04-04 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-03 00:00:00	virtual
1b3220c6-50ae-4cec-8667-41e4c0ff8a35	2024-02-27 00:04:34.617	2024-02-27 00:04:34.617	2024-01-08 21:00:00	2024-01-09 00:00:00	Claude Hawkins	a709c002-b5bb-4536-882c-80cdbb863e68	2024-01-08 00:00:00	InPerson
a118ca58-2c14-46ba-aabd-b6ef51a20de1	2024-02-27 00:05:22.93	2024-02-27 00:05:22.93	2024-04-13 15:00:00	2024-04-13 17:00:00	Antonio Cea	c74d0a1a-2b6f-4b25-a9ad-900cba5c35b1	2024-04-13 00:00:00	InPerson
b03b78a7-7c88-43c9-9628-aceb294ac14e	2024-02-27 00:05:58.929	2024-02-27 00:05:58.929	2024-04-13 15:00:00	2024-04-13 17:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-04-13 00:00:00	InPerson
092fa6c6-1f9a-4fd5-8ba1-517ab9a02eee	2024-02-27 00:07:21.153	2024-02-27 00:07:21.153	2024-04-13 15:00:00	2024-04-13 17:00:00	Matt Bar	01453bc6-dc3d-4793-8351-1cc554bc9729	2024-04-13 00:00:00	InPerson
b4be176a-1e14-4a32-9d4c-00cd1905393a	2024-02-27 00:09:34.573	2024-02-27 00:09:34.573	2024-03-06 23:00:00	2024-03-07 01:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-06 00:00:00	virtual
8588d400-e5e3-46f8-b49f-dbaa9e1ecc39	2024-02-27 00:10:25.034	2024-02-27 00:10:25.034	2024-04-13 15:00:00	2024-04-13 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-13 00:00:00	virtual
505a8a73-62ae-43a9-b727-6f30613840c8	2024-02-27 00:10:34.1	2024-02-27 00:10:34.1	2024-01-10 23:00:00	2024-01-11 01:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-01-10 00:00:00	virtual
cc329b59-e2ca-4921-9614-a7eb3d9415ba	2024-02-27 00:11:04.646	2024-02-27 00:11:04.646	2024-04-15 22:00:00	2024-04-16 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-15 00:00:00	virtual
7a154281-6f68-4b0b-92b6-df9b03301be6	2024-02-27 00:11:43.333	2024-02-27 00:11:43.333	2024-01-10 21:00:00	2024-01-11 00:00:00	Claude Hawkins	a709c002-b5bb-4536-882c-80cdbb863e68	2024-01-10 00:00:00	InPerson
c6358ea5-b477-4369-8292-31506572b262	2024-02-27 00:12:11.504	2024-02-27 00:12:11.504	2024-04-17 22:00:00	2024-04-18 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-17 00:00:00	virtual
ead4dfc0-3c1b-4a00-8b84-de3a07daae7e	2024-02-27 00:13:48.381	2024-02-27 00:13:48.381	2024-04-20 15:00:00	2024-04-20 17:00:00	Antonio Cea	d8686f52-c9bf-465e-9ab7-87cf1beb1ef2	2024-04-20 00:00:00	InPerson
6d9c3173-4339-4d94-b145-6a07892f455c	2024-02-27 00:14:25.561	2024-02-27 00:14:25.561	2024-04-20 15:00:00	2024-04-20 17:00:00	Sedric Hibler	061c8d81-2ecf-4a30-ad5b-eb912e4f9fa2	2024-04-20 00:00:00	InPerson
d8ad911d-d149-4161-87d6-7fcd537ff71b	2024-02-27 00:14:38.478	2024-02-27 00:14:38.478	2024-01-13 16:00:00	2024-01-13 18:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-01-13 00:00:00	virtual
07ce45b6-578f-4c87-991c-bf4efd73e475	2024-02-27 00:15:07.589	2024-02-27 00:15:07.589	2024-04-20 15:00:00	2024-04-20 17:00:00	Matt Bar	de7a35b4-5081-4495-b6e8-553ca2373683	2024-04-20 00:00:00	InPerson
73e73515-ea46-40b2-be51-468bb14ace35	2024-02-27 00:16:10.878	2024-02-27 00:16:10.878	2024-04-20 15:00:00	2024-04-20 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-20 00:00:00	virtual
6b0e487c-bb55-48c8-973f-ddc0061373d7	2024-02-27 00:16:37.612	2024-02-27 00:16:37.612	2024-04-22 22:00:00	2024-04-23 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-22 00:00:00	virtual
fc82b63f-410f-4daa-8c1b-388ae03e2a40	2024-02-27 00:17:12.995	2024-02-27 00:17:12.995	2024-04-24 22:00:00	2024-04-25 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-24 00:00:00	virtual
51708aae-0c7d-42ed-b898-c105fe5d3aea	2024-02-27 00:17:42.543	2024-02-27 00:17:42.543	2024-04-27 15:00:00	2024-04-27 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-27 00:00:00	virtual
4e276108-d28a-4c2d-a6c2-4b72e2f5ffd4	2024-02-27 00:18:10.098	2024-02-27 00:18:10.098	2024-04-29 22:00:00	2024-04-30 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-04-29 00:00:00	virtual
deb6fab5-f1c7-4c76-b647-5895e59cc89e	2024-02-27 00:18:38.118	2024-02-27 00:18:38.118	2024-04-27 15:00:00	2024-04-27 17:00:00	Antonio Cea	c74d0a1a-2b6f-4b25-a9ad-900cba5c35b1	2024-04-27 00:00:00	InPerson
4069081e-c3d1-4cd0-b415-0d505458acf5	2024-02-27 00:18:59.569	2024-02-27 00:18:59.569	2024-04-27 15:00:00	2024-04-28 00:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-04-27 00:00:00	InPerson
8b41f28c-b917-4fc0-a01d-3fa197cc9059	2024-02-27 00:19:23.369	2024-02-27 00:19:23.369	2024-01-13 16:00:00	2024-01-13 20:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-01-13 00:00:00	virtual
9d4138e9-2656-44ff-9f9e-48fae546a622	2024-02-27 00:19:24.712	2024-02-27 00:19:24.712	2024-04-27 15:00:00	2024-04-27 17:00:00	Matt Bar	01453bc6-dc3d-4793-8351-1cc554bc9729	2024-04-27 00:00:00	
ab10f4bf-2eea-4bfa-9dc5-ca06676026a1	2024-02-27 00:19:48.445	2024-02-27 00:19:48.445	2024-03-09 16:00:00	2024-03-09 20:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-09 00:00:00	virtual
0baaac5a-b066-42a9-afb8-221143eba6af	2024-02-27 00:22:23.701	2024-02-27 00:22:23.701	2024-03-02 16:00:00	2024-03-02 18:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-03-02 00:00:00	virtual
6a7bbc21-1980-4181-b826-37fcb212a99e	2024-02-27 00:23:49.511	2024-02-27 00:23:49.511	2024-03-09 16:00:00	2024-03-09 18:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-03-09 00:00:00	virtual
610e5f4c-3979-414c-9377-bd6a8a54c961	2024-02-27 00:25:22.893	2024-02-27 00:25:22.893	2024-03-11 22:00:00	2024-03-12 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-11 00:00:00	virtual
c939a6bc-c092-4b73-b443-5aa093be5390	2024-02-27 00:27:28.335	2024-02-27 00:27:28.335	2024-03-13 22:00:00	2024-03-14 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-13 00:00:00	virtual
eec2f85b-753a-4a67-b6c6-d1a132dd783c	2024-02-27 00:29:37.806	2024-02-27 00:29:37.806	2024-03-16 15:00:00	2024-03-16 17:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-03-16 00:00:00	virtual
24113a46-3b33-40ec-bdee-2fb7572c144c	2024-02-27 00:31:44.908	2024-02-27 00:31:44.908	2024-03-16 15:00:00	2024-03-16 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-16 00:00:00	virtual
ec25c4fe-824d-49fd-80cd-61d56c931c7e	2024-02-27 00:33:14.127	2024-02-27 00:33:14.127	2024-01-17 23:00:00	2024-01-18 01:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-01-17 00:00:00	virtual
12680a46-00f8-46e7-b349-421989890574	2024-02-27 00:34:56.71	2024-02-27 00:34:56.71	2024-03-18 22:00:00	2024-03-19 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-18 00:00:00	virtual
2ca66197-0251-4bee-9a59-e2d7ebc6cb78	2024-02-27 00:35:09.158	2024-02-27 00:35:09.158	2024-01-17 21:00:00	2024-01-18 00:00:00	Claude Hawkins	a709c002-b5bb-4536-882c-80cdbb863e68	2024-01-17 00:00:00	InPerson
e49b8ee8-1744-419a-8e3b-32bec08ecfdc	2024-02-27 00:36:30.142	2024-02-27 00:36:30.142	2024-03-20 22:00:00	2024-03-21 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-20 00:00:00	virtual
5cc081cc-356d-48ed-81ce-0eca76c37e9c	2024-02-27 00:38:37.002	2024-02-27 00:38:37.002	2024-03-23 15:00:00	2024-03-23 17:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-03-23 00:00:00	virtual
16285a78-a356-4013-b543-7b019f8a9c85	2024-02-27 00:41:23.854	2024-02-27 00:41:23.854	2024-03-23 15:00:00	2024-03-23 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-23 00:00:00	virtual
7f3078b3-535d-418c-9418-8c1686903017	2024-02-27 00:42:43.821	2024-02-27 00:42:43.821	2024-03-25 22:00:00	2024-03-26 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-25 00:00:00	virtual
628255fb-d562-4abb-a514-dd8222a8cc3d	2024-02-27 00:44:13.212	2024-02-27 00:44:13.212	2024-03-27 22:00:00	2024-03-28 00:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-27 00:00:00	virtual
94264cf2-251e-467c-9a57-4f5330be4e91	2024-02-27 00:46:16.724	2024-02-27 00:46:16.724	2024-03-30 15:00:00	2024-03-30 19:00:00	Professor Horton	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	2024-03-30 00:00:00	virtual
2bb8bf94-d360-4443-8ae5-fbf5fc92a837	2024-02-27 00:49:18.534	2024-02-27 00:49:18.534	2024-01-17 21:00:00	2024-01-18 00:00:00	Claude Hawkins	a709c002-b5bb-4536-882c-80cdbb863e68	2024-01-17 00:00:00	InPerson
6492593a-3549-4147-aca4-743904f5d7a1	2024-02-27 00:54:22.9	2024-02-27 00:54:22.9	2024-01-20 16:00:00	2024-01-20 18:00:00	Aisha	973e91f0-b868-493c-b437-b142dd525462	2024-01-20 00:00:00	virtual
7286ee86-fc85-43e2-92db-be2e130f146d	2024-02-27 00:55:17.786	2024-02-27 00:55:17.786	2024-01-20 16:00:00	2024-01-20 18:00:00	Sedric Hibler	b6924da1-fcdd-43da-b6a4-8b503045d94c	2024-01-20 00:00:00	virtual
729101cf-4271-45c0-b4bb-f9b1b59fc61e	2024-02-29 19:13:14.919	2024-02-29 19:13:14.919	2024-03-01 00:00:00	2024-03-01 02:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-02-29 00:00:00	InPerson
8117af77-843b-43f0-beb1-1f2f68dbe520	2024-02-29 19:26:53.965	2024-02-29 19:26:53.965	2024-03-01 23:30:00	2024-03-02 01:30:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-01 00:00:00	InPerson
92c33441-26f2-42db-926a-ec8039943b15	2024-03-04 22:31:28.218	2024-03-04 22:31:28.218	2024-03-05 01:00:00	2024-03-05 04:00:00	Teacher	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
6b53f193-e5cb-4e06-a880-a0295eb9968e	2024-03-04 22:35:47.516	2024-03-04 22:35:47.516	2024-03-06 01:00:00	2024-03-06 04:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-05 00:00:00	InPerson
b6132cfb-70a4-4ce4-a6ec-bee2d4ee2b0e	2024-03-04 22:49:15.88	2024-03-04 22:49:15.88	2024-03-05 01:00:00	2024-03-05 03:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
97a66da4-5902-45a3-a908-d8993da7128a	2024-03-04 22:51:55.558	2024-03-04 22:51:55.558	2024-03-05 01:00:00	2024-03-05 03:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
fd9729f6-1479-41c6-bc22-8b69a2872d5b	2024-03-04 22:52:44.457	2024-03-04 22:52:44.457	2024-03-05 01:00:00	2024-03-05 03:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
d8eb9cd6-81dd-42e4-9854-8f6bc9f35136	2024-03-04 22:53:41.869	2024-03-04 22:53:41.869	2024-03-05 01:00:00	2024-03-05 03:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
703201b9-4c91-4857-9afb-ce7914f5b4db	2024-03-04 22:56:21.337	2024-03-04 22:56:21.337	2024-03-05 01:00:00	2024-03-05 03:00:00		5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
2558a085-eb09-4160-8899-f9a0a3044b3f	2024-03-04 23:28:15.961	2024-03-04 23:28:15.961	2024-03-05 08:00:00	2024-03-05 10:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-05 00:00:00	InPerson
b59e554d-b1b2-438a-b5eb-c6d0e02b9c9e	2024-03-04 23:32:56.407	2024-03-04 23:32:56.407	2024-03-09 16:00:00	2024-03-09 18:00:00	Aisha	973e91f0-b868-493c-b437-b142dd525462	2024-03-09 00:00:00	virtual
69d51854-cfb3-4c30-b204-b8a4976ebffd	2024-03-04 23:41:13.273	2024-03-04 23:41:13.273	2024-03-25 22:00:00	2024-03-26 00:00:00		db852930-9a8e-4372-9f3c-675e7095177e	2024-03-25 00:00:00	virtual
8cd58d15-9f5d-4998-9356-a06a8dae1acb	2024-03-04 23:41:53.433	2024-03-04 23:41:53.433	2024-03-26 22:00:00	2024-03-27 00:00:00		db852930-9a8e-4372-9f3c-675e7095177e	2024-03-26 00:00:00	virtual
c199de65-8178-45c8-9ab1-cf4fe7d9c64f	2024-03-04 23:42:36.358	2024-03-04 23:42:36.358	2024-03-27 22:00:00	2024-03-28 00:00:00		db852930-9a8e-4372-9f3c-675e7095177e	2024-03-27 00:00:00	virtual
de7bd84b-7f13-4e71-a258-7c8f90eab886	2024-03-04 23:43:59.527	2024-03-04 23:43:59.527	2024-03-28 22:00:00	2024-03-29 00:00:00		db852930-9a8e-4372-9f3c-675e7095177e	2024-03-28 00:00:00	virtual
f68bb017-e334-475f-acd7-4c606b9445db	2024-03-04 23:44:40.397	2024-03-04 23:44:40.397	2024-03-29 22:00:00	2024-03-30 00:00:00		db852930-9a8e-4372-9f3c-675e7095177e	2024-03-29 00:00:00	virtual
23915ba9-ad14-4b20-bcfc-9db81b1a83e3	2024-03-04 23:46:21.841	2024-03-04 23:46:21.841	2024-03-30 15:00:00	2024-03-30 17:00:00		b16b3883-8e97-41dd-a55a-040c1a0261f3	2024-03-30 00:00:00	virtual
fbb841dd-c952-4c73-a220-96327aad4c7d	2024-03-04 23:47:31.004	2024-03-04 23:47:31.004	2024-03-02 16:00:00	2024-03-02 18:00:00	Aisha	973e91f0-b868-493c-b437-b142dd525462	2024-03-02 00:00:00	virtual
4b785c93-5435-4837-b01b-c920c13626b6	2024-03-05 00:04:31.796	2024-03-05 00:04:31.796	2024-03-05 03:12:00	2024-03-05 04:12:00	3/4 9:12/10:12	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-04 00:00:00	InPerson
4dc154f4-5f88-45cb-a5fb-081b0fd8e5e8	2024-03-05 21:27:40.385	2024-03-05 21:27:40.385	2024-03-07 02:27:00	2024-03-07 04:27:00	Testing 8:27-10:27	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-06 00:00:00	virtual
946e7757-2026-4181-a289-89531491a66c	2024-03-05 21:30:44.017	2024-03-05 21:30:44.017	2024-03-07 13:07:00	2024-03-07 14:08:00	Testing 707 to 808	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-07 00:00:00	InPerson
5c10fa4f-8e43-4582-ac1a-99ecb3d368cc	2024-03-06 22:17:45.366	2024-03-06 22:17:45.366	2024-03-08 14:20:00	2024-03-08 15:20:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-08 00:00:00	virtual
4925c1db-e06b-4f47-9663-dba0829a0e00	2024-03-06 22:25:02.476	2024-03-06 22:25:02.476	2024-03-10 15:00:00	2024-03-10 16:00:00	3/10/2024 10 to 11	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-10 00:00:00	InPerson
7146a341-bffb-4824-973c-e91199215acd	2024-03-07 18:48:38.19	2024-03-07 18:48:38.19	2024-03-31 13:30:00	2024-03-31 14:30:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-31 00:00:00	InPerson
3b3079c8-66de-40b3-841b-0e9ef803ceb1	2024-03-07 18:50:51.465	2024-03-07 18:50:51.465	2024-03-24 13:00:00	2024-03-24 14:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-24 00:00:00	InPerson
83c9db16-d4dc-465c-be24-0f4506e1d13a	2024-03-07 18:58:44.181	2024-03-07 18:58:44.181	2024-03-10 13:00:00	2024-03-10 14:00:00	Teacher	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-10 00:00:00	InPerson
1e5bba04-2df9-4f6e-86bc-2fac2b58957d	2024-03-07 18:59:47.846	2024-03-07 18:59:47.846	2024-03-14 13:00:00	2024-03-14 14:00:00	Teacher	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-14 00:00:00	InPerson
6dd8fbfe-e0b8-48e8-8ad8-f6c16904c818	2024-03-09 19:18:41.709	2024-03-09 19:18:41.709	2024-03-09 18:00:00	2024-03-09 20:00:00	Test	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
a5b5487d-cf09-4bed-8142-ffa317e80117	2024-03-09 19:19:10.801	2024-03-09 19:19:10.801	2024-03-09 18:00:00	2024-03-09 20:00:00	Test	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
dd9f4000-6390-4e23-a098-5b3f75664455	2024-03-09 19:21:46.297	2024-03-09 19:21:46.297	2024-03-09 18:00:00	2024-03-09 20:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
d7180f2c-f8f1-4c95-97fd-dd5b8dfc8ea5	2024-03-09 19:31:16.409	2024-03-09 19:31:16.409	2024-03-09 18:00:00	2024-03-09 20:00:00	Test	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
47a7e525-5927-4f25-bbd2-be1dfb63299c	2024-03-09 19:33:18.905	2024-03-09 19:33:18.905	2024-03-09 18:00:00	2024-03-09 20:00:00	Test	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
591f04ce-eb05-415e-bffd-6f3785fd7cf5	2024-03-09 19:34:51.252	2024-03-09 19:34:51.252	2024-03-09 18:00:00	2024-03-09 20:00:00	Test	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
489fff9f-300e-413d-a389-1a168c7e11bd	2024-03-09 23:20:08.926	2024-03-09 23:20:08.926	2024-03-09 18:00:00	2024-03-09 20:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
52610026-bea3-4384-89fe-d6f4863000d2	2024-03-09 23:21:57.087	2024-03-09 23:21:57.087	2024-03-09 18:00:00	2024-03-09 20:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
8fa4cda8-9280-4d45-bfe4-1101f9e4764d	2024-03-09 23:24:56.171	2024-03-09 23:24:56.171	2024-03-09 18:00:00	2024-03-09 20:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
f5a57e8a-6861-4ae8-8bfc-421f4d6d7f0a	2024-03-09 23:31:36.646	2024-03-09 23:31:36.646	2024-03-09 18:00:00	2024-03-09 20:00:00	Testing	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-09 00:00:00	InPerson
6b9b06ed-e2c8-4ad6-9760-0135f5c66c88	2024-03-11 21:02:48.561	2024-03-11 21:02:48.561	2024-03-12 00:02:00	2024-03-12 04:05:00		5548805a-69e4-481c-8463-bb49bea1c330	2024-03-11 00:00:00	InPerson
d5689706-1aac-4d82-9634-86fc53913752	2024-03-21 20:26:40.562	2024-03-21 20:26:40.562	2024-03-21 13:00:00	2024-03-21 15:00:00	21	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-21 00:00:00	InPerson
0ce331d4-2efe-401f-a22e-9d654001512e	2024-03-21 20:27:07.045	2024-03-21 20:27:07.045	2024-03-22 13:00:00	2024-03-22 15:00:00	22	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-22 00:00:00	InPerson
72494aa6-ac69-4c53-9888-fcea5cccac50	2024-03-21 20:27:31.792	2024-03-21 20:27:31.792	2024-03-23 13:00:00	2024-03-23 15:00:00	23	5548805a-69e4-481c-8463-bb49bea1c330	2024-03-23 00:00:00	InPerson
\.


--
--

COPY public.parent (id, created_at, updated_at, email, password, "fName", "lName", "phoneNumber", birthday, "educationLevel", "veteranStatus", "regularTransportation", "housingStatus", "demographicInfoId", "salesforceId") FROM stdin;
40b91efb-989d-4426-a571-2aa0543e0c2b	2024-01-14 06:47:30.169	2024-01-14 06:47:30.169	latenight@email.com	$2b$12$oSMteClNHi423JyMN.a3peNADROicq9yiQl7XLawQQCiiidjWCn6u	Late	Night	4521547878	2024-01-08	SomeGraduateSchool	NotAVeteran	t	Rent	369c8b7b-a55c-4450-870c-9b640ca01d3b	003WD000001aFxdYAE
420efa5b-da50-4f37-84b4-1c9f5e8fca18	2024-01-14 22:28:20.376	2024-01-14 22:28:20.376	johnstossel@email.com	$2b$12$kj4tZIXSWlPjTk9grzCo5e.lJV20WuogJLTBHdLwUJjS8TAieK/WS	John	Stossel	4565851219	2024-01-10	MastersDegree	NotAVeteran	t	Own	e1d2a9a7-0723-41e0-81c4-70065dc146fd	003WD000001b1XeYAI
6702d149-f52b-40f0-bb37-b31f8477e9de	2024-01-14 23:22:12.14	2024-01-14 23:22:12.14	liveparent@email.com	$2b$12$JNPDlrN.Zxq1ZTVrtplBFucpmX/j3gK4MDsY2kjGhc5F1CCZxDypK	Live	Parent	1514441559	2024-01-16	SomeHighSchoolOrLess	NotAVeteran	t	Own	18ec23d3-1d7d-48cf-a789-88c254009709	003WD000001b76nYAA
06742aff-a6ef-4199-8164-1a3b8eeddd7f	2024-01-12 17:15:49.042	2024-01-12 17:15:49.042	jay.gruden@email.com	$2b$12$jr5h0bXDQQGvNubK92gbWeJetcqbXgqoDmS8bwIn64WiAM0WG3Yvm	John	Osmond	8164554587	1980-01-01	NoSchooling	NotProtectedVeteran	t	Own	25f82f41-54bd-4436-b71a-3ec25ae60be7	003WD000001Y1vbYAC
fa8e993d-e227-4506-b044-533513a12ff9	2024-01-15 15:38:26.994	2024-01-15 15:38:26.994	hinesward@email.com	$2b$12$u3m/yZA2xLZE76iyJk2gC.lmyeKEfKIHx.pSJ9bLi4E91JUD.BtVy	Hines	Ward	3211231234	2024-01-14	SomeGraduateSchool	BelongToSeveralClassifications	t	Own	205600ce-727f-4729-9f9d-0248aea98949	003WD0000020pnmYAA
9f593047-9fe3-42f7-b33c-981a7f6b3664	2024-01-13 20:41:22.492	2024-01-13 20:41:22.492	loscabos@email.com	$2b$12$JtstG3j7m8J3adeDHZ2f.e/0/EL3nHplUzzaB7LReepLG/2FBa3pS	Los	Cabos	2165851219	2024-01-09	MastersDegree	NotAVeteran	t	Own	8271dfe4-fdcf-4cd9-afb4-576fa9b6d676	003WD000001ZhW9YAK
aed7e852-ec81-4212-958c-2456adf35c88	2024-01-13 20:55:05.159	2024-01-13 20:55:05.159	maxhope@email.com	$2b$12$cCyJ5gvFMNyOGsknb/3Hu.pm4No6.ouuRTHpWrcF0/RhEuCNsciIm	Max	Hope	2225851219	2024-01-01	NoSchooling	BelongToSeveralClassifications	t	Rent	8d57b2c5-6c66-4003-91be-dc8466881405	003WD000001Zi0oYAC
05efbb42-a63a-4e28-9e84-fa5539ce4ad7	2024-01-13 20:57:26.656	2024-01-13 20:57:26.656	jackrobinson@email.com	$2b$12$UTmrUyDucrbtQofAOTSTu.W0o4ywex7gjZOVAHJU3aIVdOuM9o7O2	Jack	Robinson	4445851219	2024-01-01	MastersDegree	NotAVeteran	t	Rent	bc953a6b-c682-496b-ba2f-df5cd134a38a	003WD000001ZiFJYA0
8644e11b-0954-4fd8-ae5d-660004b78ef8	2024-01-12 18:29:07.159	2024-01-12 18:29:07.159	johnstockton@email.com	$2b$12$SlYHhiriFGxK18rpIBnUUeInupcA3NJ0CqiUvW.O2n.mzt0UQQtlO	John	Stockton	3165851219	2024-01-02	SomeHighSchoolOrLess	NotProtectedVeteran	t	Own	13757740-f44b-4c03-ab1a-a9ef2326623f	003WD000001Y6AVYA0
99a7fe58-31c2-49a0-9f9e-f3dbef444956	2024-01-13 21:07:15.962	2024-01-13 21:07:15.962	markjackson@email.com	$2b$12$009NAbzudMqT.QK7GehlauYqfC7pL6qQITadSR8RDWQ8PEW28LX5q	Mark	Jackson	5165851219	2023-12-31	MastersDegree	NotAVeteran	t	Rent	c4f19cf4-350a-4beb-abbc-c62955261782	003WD000001ZiiLYAS
3e71a7a5-8ee3-4207-861b-87696f667541	2024-01-13 21:50:20.851	2024-01-13 21:50:20.851	stevekerr@email.com	$2b$12$Jgu36VeTPh0OJ1X5dk8dDOViVt0yN2bylyO5RKnLppoSgwZRsvln.	Steve	Kerr	6545851219	2024-01-10	SomeHighSchoolOrLess	NotAVeteran	t	Rent	3e8e2f12-4826-4f59-ac99-1f85c2a49c39	003WD000001ZkaTYAS
b090bfb0-301d-4a95-ab1d-fe90f4199869	2024-01-15 16:00:57.014	2024-01-15 16:00:57.014	dakprescott@email.com	$2b$12$ZfDqgdLYO7JE5iMiBPsIq.2/eDdbImrMk/ZidaA00weq9QT9B2d02	Dak	Prescott	4551223355	2024-01-14	SomeHighSchoolOrLess	BelongToSeveralClassifications	t	Rent	8ce0d64f-a3aa-46c5-b39c-db1ae566772a	003WD0000020s45YAA
aef9a6c2-103b-415d-a902-9fb3c33d1160	2024-01-16 17:19:23.627	2024-01-16 17:19:23.627	story.adrienne@gmail.com	$2b$12$qJmM.w/64fQkVi3eYVDeQ.cVOJq4UXi/N4b1QQcLypna67ZqWOsm.	Adrienne	Story	8164566890	1986-05-09	SomeCollege	NotAVeteran	t	Rent	76ac8194-60d4-4485-9fd6-fffd8ac3477b	003WD000002Ag3GYAS
c4faed3d-0cb6-43d3-97b8-6041c5d21af4	2024-01-15 16:24:08.614	2024-01-15 16:24:08.614	rasheerice@email.com	$2b$12$95evXEPbT57iazPJOmsNX.VqGLzFElFHI7BXL1RgZHY3tLg65YPae	Rashee	Rice	4555551515	2024-01-08	DoctoralDegree	NotAVeteran	t	Rent	ce15b965-a34a-4224-90d4-2a6787a59c13	003WD0000020ux7YAA
a59ee873-20ca-4e77-9255-66ad8ff0abc5	2024-01-15 21:22:24.17	2024-01-15 21:22:24.17	justinross@email.com	$2b$12$a7zZOhcsIz5XrKEGGIPRo.TFvFjtdMDbBTcm7PtJ1HsZGmTTHe2xa	Justin	Ross	6544584545	2024-01-08	MastersDegree	NotAVeteran	t	Rent	6fa93675-1b95-4188-a178-61900e5e87e5	003WD0000028WHiYAM
c4c289f8-1caa-4b05-8732-1c56fdf5d01a	2024-01-13 03:36:15.227	2024-01-13 03:36:15.227	maxcrosby@email.com	$2b$12$XvILNd7QhNs9urUahks/MOYCnt9B.ss5mNd2YL6ax928rthLaIlxG	Max	Crosby	5555851219	2024-01-08	MastersDegree	NotAVeteran	f	Rent	76bb2959-ff19-491b-952f-54508ff7746c	003WD000001YrsXYAS
51a76a3b-df0e-4ddb-9acb-f088080bcc7a	2024-01-13 03:56:17.901	2024-01-13 03:56:17.901	johnstockton@email.com	$2b$12$dMhJ4ECG5Mwmei2bFmQoQu9mee4e83g2cVJA8c8CtmUtxobelDTgO	James	Hardy	6165851213	2024-01-09	NoSchooling	BelongToSeveralClassifications	f	Own	2e80370d-2e4a-43f7-8cc5-d53d170eac5e	003WD000001YrsYYAS
954b8c77-b476-4459-8ca5-e7951db57eef	2024-01-13 16:13:39.931	2024-01-13 16:13:39.931	jamesgray@email.com	$2b$12$NevwyE3ppgQbErgS5KlpUO/UcMBbJN3vRP9OlGLGTUJQyya3O0Ccq	James	Gray	7895851219	2024-01-01	MastersDegree	NotAVeteran	t	Own	f1f24686-23a2-4988-bcf8-46313bd41501	003WD000001ZRKyYAO
e622f03a-4f1c-43b2-a4af-b25a82bb4478	2024-01-17 19:52:21.151	2024-01-17 19:52:21.151	nicole.urban@wecodekc.org	$2b$12$ZduP8gqC9Gzmf7MJ3Snj3ODs0em3eopKc3xpJKQxLKd9j94sEbKCS	WeCode	Urban	816-898-7602	1976-02-19	MastersDegree	NotAVeteran	t	Own	c038275a-7b6c-4cf4-ba19-f3b8a8dd24a4	003WD000002CFa1YAG
7d3dd3f2-689a-4180-85fe-9d453608694e	2024-01-17 19:52:23.113	2024-01-17 19:52:23.113	nicole.urban@wecodekc.org	$2b$12$Ljolnk2Qzq7tGg7G0jHHSec9AgnxX3cep3sqXegAOfLjgJVbQKxGK	WeCode	Urban	816-898-7602	1976-02-19	MastersDegree	NotAVeteran	t	Own	be759f42-a300-4bd6-b82a-abf63c8a3a6a	003WD000002CFbdYAG
60a3545c-0e0a-4227-8435-43116bdf8a8b	2024-01-17 19:53:14.921	2024-01-17 19:53:14.921	claude.hawkins.jr@gmail.com	$2b$12$ep8SmMDpQurjw8H/hog.Z.0t69w8xP/fsWNKhSevXIMj1CfLhfiEC	Claude	Hawkins	8167881638	1980-06-16	SomeCollege	NotAVeteran	t	Own	e35d8ba7-cdca-4924-98bf-e46776a7ef3d	003WD000002CFi5YAG
1f2b28a1-832f-4ce1-80cc-4ad265d34346	2024-01-13 18:23:50.448	2024-01-13 18:23:50.448	lotannaemail@email.com	$2b$12$LgfhKD5LG7rV8TchW8cWa.b17Oa5nWP491iFfAo4kKH1wT/WhTD8e	lotanna	okoli	0987654321	1986-08-14	SomeGraduateSchool	BelongToSeveralClassifications	t	Rent	002497f0-8c73-4fa1-a4f2-00e05a1ebd66	003WD000001Zab7YAC
b8881b4a-2a37-4bf0-9a60-78fe7ee3db58	2024-01-17 20:02:05.828	2024-01-17 20:02:05.828	sharmelle.winsett@wecodekc.org	$2b$12$dLJQWwXZxNkaC4/cKNtre.6jeCT8OGfuzrpP08/6YJQ44JJlZmBlW	Sharmelle	Winsett	8165478387	1975-09-22	MastersDegree	NotProtectedVeteran	t	Own	238ef043-40d3-4479-b845-622f455326a7	003WD000002CGIBYA4
850590cb-d0e9-4b4d-b754-fcea6df34a4c	2024-01-13 18:33:35.249	2024-01-13 18:33:35.249	email@zh.gov	$2b$12$mlX2R.sx2exglzVowpaeCO7kRrgnOYDwYI7Aw6x0yj8E5N0GsVsKC	近平	习	2378889999	1969-01-01	HighSchoolGraduateGED	NotProtectedVeteran	f	Rent	a5458f74-a575-47d1-9dc3-0debe376bc3f	003WD000001Zb49YAC
536fcaa3-db67-4921-84b0-86ed6a0bdf49	2024-01-13 18:33:40.952	2024-01-13 18:33:40.952	newparent3@email.com	$2b$12$ZXTP.zfjMD6ncdcqKrMqcOzyXkDMeZG9C94F/3FrKsV5M2SHIz/ge	Newparent3	NewParent3	1234567890	1992-02-13	BachelorsDegree	BelongToSeveralClassifications	t	Own	95773a5f-2bd4-4500-80d5-1b5435511ef3	003WD000001Zb5lYAC
7a3645d9-3683-4381-bf86-bc20cd5b52ba	2024-01-18 18:11:43.962	2024-01-18 18:11:43.962	nicole.urban@wecodekc.org	$2b$12$w4OomrDlXXOSJ97woi42pOmroR9j6YMpuqWNPwLL/5CYZHyLwqCDK	Nicole	Urban	8168987602	1976-02-19	MastersDegree	NotAVeteran	t	Own	3a749933-9fbf-4bb1-b8c5-f08553f99ce1	003WD000002DQehYAG
c3668b80-2ace-4145-b37f-c31494c23ded	2024-01-18 18:11:44.971	2024-01-18 18:11:44.971	nicole.urban@wecodekc.org	$2b$12$Ihgpoo7PPU4qQD5uMsnQOedVX35/58ZFn38kiKhGdUKPt5ojlyvXe	Nicole	Urban	8168987602	1976-02-19	MastersDegree	NotAVeteran	t	Own	1fe5783a-3507-4102-8846-b09c611c8ee2	003WD000002DSOjYAO
884ed0af-8646-49f5-8951-82c44242c5f2	2024-01-18 18:35:11.461	2024-01-18 18:35:11.461	n.urban76@yahoo.com	$2b$12$R8OPY7JQPnpGWZcA/owcEeoq1sZ9CVlPhDC3fPC14odnTHhqbaq1y	Nicole	Urban	8169999999	1976-02-19	MastersDegree	NotAVeteran	t	Own	ca794e66-964a-43d2-9b54-f2669a859e8b	003WD000002DTflYAG
3d335998-91d2-4e4b-9a04-cd2637480a64	2024-01-20 14:43:28.867	2024-01-20 14:43:28.867	kevingates@email.com	$2b$12$/GJgXJcxlWSmauwwVUMydu/wIsz9IjAuOwuKgEb0TEdolUnqVQ7Hy	Kevin	Gates	5165851219	2024-01-15	SomeHighSchoolOrLess	NotAVeteran	t	Rent	0e435145-ec82-4821-9f5c-8ceee185eff7	003WD000002FfMRYA0
54b8833a-55ae-49a7-b3eb-042550dfe83d	2024-01-20 19:48:52.882	2024-01-20 19:48:52.882	l.okoli@email.com	$2b$12$lkagbquHmMWB0BPXBTBP1OIYXOSNSDiIHyncBFlx4IVNoyFN7YeuS	Lotanna	Okoli	8161234567	1988-08-14	HighSchoolGraduateGED	BelongToSeveralClassifications	t	Own	8240112b-ac2d-4430-a74a-ab15e87fbcc7	003WD000002Fql7YAC
a08bb0e5-d2d3-42e0-970d-62c802e89528	2024-01-20 19:51:40.585	2024-01-20 19:51:40.585	pipiwa7232@mcenb.com	$2b$12$b21O5i/Wj/eznTP.J.rsiuAmHj95h7uY9jE0hdWSVgQS5aByNOr/2	TestAccount	NumberFiveBillion	9019019001	2010-10-10	SomeHighSchoolOrLess	BelongToSeveralClassifications	t	CurrentlyDisplaced	79bcf982-72ca-4fee-a614-33036e7d488e	003WD000002Fqy1YAC
dcc56dba-6ab8-4a85-be2c-622aef62e60e	2024-01-23 00:37:46.553	2024-01-23 00:37:46.553	yeah@email.org	$2b$12$p5kVf0r7ZLEAz4XCkE562eSSEeBFDggnB2vAYf5Xw4Y9LLfdapDra	Testing	NewSignOn	1010001101	2010-10-10	NoSchooling	BelongToSeveralClassifications	t	Own	bf323aa9-7391-496c-9b79-bdbd487e3d5b	003WD000002IJ1lYAG
550cb829-7947-446f-bb93-29c4f9cf4b69	2024-01-27 19:07:37.923	2024-01-27 19:07:37.923	john@email.com	$2b$12$PvPzPorVohFBbxinJ8OeSOvqFxvyaEIn2U3l7epRxn4MB/Qz0p3DG	John	Willings	1234567890	1975-05-27	HighSchoolGraduateGED	NotAVeteran	f	Own	e77fdb9a-8f18-40b1-9de3-5d0bd2c338af	003WD000002S1mPYAS
c45a8fa5-a562-4c07-8e47-376c94616087	2024-01-27 19:43:33.981	2024-01-27 19:43:33.981	sample@yahoo.com	$2b$12$lL8/gEof5UeDR5Zp8n76KufXPxUaC6WwkoQUaONtaptTQwWOjjwda	sample	sam	8165393635	1982-01-27	SomeCollege	NotProtectedVeteran	t	Own	256e8334-6fd3-4735-96f2-551bf5739029	003WD000002S2ybYAC
165b189a-4d97-4675-bb85-d71e6be6f342	2024-02-10 19:28:40.051	2024-02-10 19:28:40.051	great@cool.net	$2b$12$xubVvI6JDt8ThMorpklrKeEe2NpWnhA2.tHXdNqqO79TyKIGS6nGK	BetaBadgeTest	BetaBadgeTest	1991991999	1999-01-01	SomeCollege	NotProtectedVeteran	t	Rent	7864bdc3-f0a4-49a1-a211-77c037637b22	003WD000002k8HZYAY
960aaeb4-0fce-4b9e-bb55-7d14bde7a267	2024-01-29 23:10:24.326	2024-01-29 23:10:24.326	sample@gmail.com	$2b$12$/4qP.iGoj8ORIbKY0sthAOR27boMqCHk8LYcl2JiUJBnDJMNirrSm	Danielle	Turner	8162224545	1988-01-29	SomeGraduateSchool	NotAVeteran	t	Rent	64753766-11e4-45cb-9045-4be24aab2718	003WD000002U0B7YAK
d08a29f2-aac9-49ed-8ce6-6ab36b009d01	2024-02-15 23:10:04.931	2024-02-15 23:10:04.931	tanika.d.harris@gmail.com	$2b$12$FpqwSJWx2XiGq3AVOGRRSulHUzvOZYnK0htK28BCVlcH3XEwdgQ16	Tanika	Harris	9139980877	1976-07-04	AssociatesDegree	BelongToSeveralClassifications	t	Own	2d08da9b-7cf3-4753-9141-e3954b90d99d	003WD000002sf0DYAQ
17015605-d920-4a2c-acf0-73dab0d77ca5	2024-02-17 16:55:51.654	2024-02-17 16:55:51.654	houmbiejonathan@gmail.com	$2b$12$OIQ1KIOfFfk9Rjllr6hmUuB4I1UkzvRnW2pUlUSVclKrwkyKiCUyC	Jonathan	Houmbie	8160000001	2024-02-17	SomeCollege	NotAVeteran	f	Rent	5f97d4a5-c414-4d07-997f-161c24c1819b	003WD000002vPgTYAU
2e3ad929-c932-4367-a604-e49f0387dc66	2024-02-03 17:38:28.462	2024-02-03 17:38:28.462	johnsmith@email.com	$2b$12$EX8ZUzJI8jQpHxMKCP2ZouMdsyRSG4oyIsMFS7sghROvi1ZjjqONa	John	Smith	3335851219	2024-01-29	NoSchooling	NotAVeteran	t	Rent	6026ce82-50cb-41eb-869f-07358bd10e4a	003WD000002ZaykYAC
7be31104-22be-4cf5-b00d-dff77ecdd8f9	2024-02-06 00:55:27.045	2024-02-06 00:55:27.045	np55@email.com	$2b$12$VzlDzS7WHbRPPVqXvMAKwe.uh1eTG7o8ofuyN3sGxJ8VAxO1AhSci	Newparent55	parent	1234567890	1992-02-05	BachelorsDegree	NotAVeteran	f	Rent	1ca8b059-13ea-490a-83d5-d4eee49b1a1e	003WD000002bqjIYAQ
864a1de7-dfbc-484d-abe5-44f4c62dfe19	2024-03-07 00:04:21.656	2024-03-07 00:04:21.656	chrisjones@email.com	$2b$12$3cBDC2Z2.0d22ewqDLb84.5a0/8Rg8jPs9vKyHVZ0QYoex7zkVADm	Chris	Jones	8541512323	2024-02-25	HighSchoolGraduateGED	BelongToSeveralClassifications	t	Own	9635e7e2-ab91-4527-a42f-cdd93465ce67	003WD000003JHzXYAW
7908bc2a-59e6-4923-9e7e-d058274b5184	2024-03-09 04:28:15.604	2024-03-09 04:28:15.604	reynolds.scott@gmail.com	$2b$12$7ilWxIQxNvCLGfGkl7KOnuUx.X2YAqf1tBq3OpBAZHETreguZ1NDu	Scott	Reynolds	8167698759	1980-07-22	MastersDegree	NotAVeteran	t	Own	bfa1a63b-0d0e-44d2-a81a-7d6c363b5bae	003WD000003N3GPYA0
4e85b51a-e4f3-4680-875f-9b73b8abff71	2024-03-19 21:51:42.936	2024-03-19 21:51:42.936	janeaustin@email.com	$2b$12$uwt2chZscdVYANIsQBKtau7ZhNJ8lCKAP8Uf51VDzXkfqiMGrqxq2	Jane	Austin	2432333333	2024-03-04	SomeHighSchoolOrLess	BelongToSeveralClassifications	t	Rent	dd2f2a8e-95fa-4aef-a316-fc8ed18da34b	003WD000003XqB2YAK
b6a61c50-17df-4f1b-a926-c1ce56066917	2024-03-20 23:10:52.503	2024-03-20 23:10:52.503	timdsf@sdd.com	$2b$12$kCjg7Rq7WC9BqjKSpFTfe.h4MV/R.Kx15Xrbe7P2l3F93CoaOe4ra	sd	sdf	8165851219	2024-03-28	NoSchooling	NotAVeteran	t	Rent	cf355477-cd35-4c13-83fb-ed6e99e2290d	003WD000003Z65eYAC
3ca22386-c3a8-4013-9b08-eb3e6b194b5b	2024-03-20 23:11:03.499	2024-03-20 23:11:03.499	testparentsemail@emailservice.net	$2b$12$DZZPzDKmXZn996SbZgSYXO/ZMno355iOoAIM9cV78wMMvfSeRIc0u	TestParent	Demonstration	8167655432	1990-10-10	SomeCollege	BelongToSeveralClassifications	t	Own	3ce4e41e-db5f-4460-a1c9-d41f71ab2c03	003WD000003Z68sYAC
b634faa0-7674-489c-9659-fc5a4e8c0f95	2024-02-06 20:04:20.898	2024-02-06 20:04:20.898	joegates@email.com	$2b$12$L41sMDda45VKLOUPz76H4uMw3q9Mqua1gnVnnRW4NXAAlvJBrB9A2	Joe	Gates	2225851219	2024-01-30	MastersDegree	NotAVeteran	f	Rent	cc1b208e-87d4-4297-8103-fac327427eac	003WD000002czm7YAA
\.


--
--

COPY public.student (id, created_at, updated_at, email, password, "fName", "lName", "phoneNumber", birthday, grade, "schoolName", gender, "zipCode", "parentId", "salesforceId", "emergencyContact", "profileImagePublicId", "profileImageSecureUrl") FROM stdin;
2f32e4bb-ff97-4456-92fe-76086f167641	2024-01-13 18:24:32.252	2024-01-13 18:24:32.252	lotannasonemail@email.com	$2b$12$/3vNViaSEEBd5LWMj9oYJ.zQHjBcngDrAUrzCliB7pHSM7CK/xdHi	Lotanna Son	Okoli	1234567890	2007-08-12	Junior	shol	Male	12345	1f2b28a1-832f-4ce1-80cc-4ad265d34346	003WD000001ZaMcYAK		we-codekc/q3ltvgp0etrmng7dbfss	https://res.cloudinary.com/dvryitnrx/image/upload/v1705171419/we-codekc/q3ltvgp0etrmng7dbfss.jpg
2b2fa1ba-5ef8-4b4f-aa62-be3fa3e605a0	2024-01-15 16:24:54.022	2024-01-15 16:24:54.022	rasheeson@email.com	$2b$12$qfVrPrSu5J1Vt94lpF6QIukjZae81naIrSYjMp14k9zYxjDE1uPuW	Rashee	Son	3215851219	2024-01-08	Freshman	Northeast	Male	64111	c4faed3d-0cb6-43d3-97b8-6041c5d21af4	003WD0000020pJ8YAI	Mom 8164548989	we-codekc/rlmc3fnjemc8uu4kwjqh	https://res.cloudinary.com/dvryitnrx/image/upload/v1705336143/we-codekc/rlmc3fnjemc8uu4kwjqh.jpg
bcb2d3e1-574b-420a-ae34-f8d542594708	2024-01-13 03:34:08.814	2024-01-13 03:34:08.814	second@email.com	$2b$12$lZH9NlQH2hKe/b5lILov/ufYvXp7dnI3R4c82RwbCmwrOcoe.Q0fG	Second	Student	8885851219	2024-01-16	Sophomore	Northeast	Male	64111	8644e11b-0954-4fd8-ae5d-660004b78ef8	003WD000001YqDMYA0	Mom 8164548989	\N	\N
734facc9-3cf9-47d5-a632-9d9a9424e1f5	2024-02-06 00:57:27.63	2024-02-06 00:57:27.63	np53@email.com	$2b$12$OM/hme14tGCMnRegbKqcxu2Tav4VduGfl7RIRNBSiG1jJQ6UnX6EO	Joe	Newparent	8177777777	2010-02-05	Seventh	Highbridge middle school	Male	12345	7be31104-22be-4cf5-b00d-dff77ecdd8f9	003WD000002bkSZYAY	Mom	\N	\N
ad0d0d8c-90c6-4d1a-808a-472b913002e1	2024-01-13 20:42:24.45	2024-01-13 20:42:24.45	bobby@emal.com	$2b$12$5ZQbbFMbsPFmYDzvyhfwiup2G/yCR/F220w5345s.cAqlP2cPgAyW	Bobby	Coppage	3165851219	2024-01-03	Third	Northeast	Male	64111	9f593047-9fe3-42f7-b33c-981a7f6b3664	003WD000001ZhKsYAK	Mom 8164548989	\N	\N
e3c85213-53b4-489c-9985-fa416a2ba164	2024-01-13 03:37:26.724	2024-01-13 03:37:26.724	maxson@email.com	$2b$12$u4QumNFRf9s3VZpywCs3Su6xqcbo/3zsKEcJmRPfpqpbNZAj3eRZe	Max	Son	6675851219	2024-01-08	Freshman	Northeast	Male	64111	c4c289f8-1caa-4b05-8732-1c56fdf5d01a	003WD000001YrxNYAS		\N	\N
e518f5a5-b0ab-4e0c-a46a-0dc76b7258e7	2024-01-29 23:11:42.322	2024-01-29 23:11:42.322	sample@gmail.com	$2b$12$YsEuGKUxbpH1NOylpR6wheO17iSV1Dltf1T/xGrBiSGjBPUISYxH.	Kid	One	8162224545	2000-01-29	Seventh	School	Female	64138	960aaeb4-0fce-4b9e-bb55-7d14bde7a267	003WD000002U0CjYAK	Mom 8165698965	\N	\N
87730e2e-a25f-4fcf-a5fe-7bc47c680b06	2024-01-13 21:51:02.746	2024-01-13 21:51:02.746	steveson@email.com	$2b$12$/11TGBPrx8nrne.cKBfDWOB5IIV29dqiSCEmu.qgcZLbk07fEavam	steves	son	3575851219	2024-01-03	Junior	Northeast	Female	64111	3e71a7a5-8ee3-4207-861b-87696f667541	003WD000001Zkc5YAC	Mom 8164548989	\N	\N
5bfe1bc9-1eb6-4536-8448-606ecbfd929a	2024-02-02 20:10:11.972	2024-02-02 20:10:11.972	ronnielott@email.com	$2b$12$peKSm8NlbRTKvhy4ihXWUeEj3jjm83UQk.o.Qh0.6w.sgcE.v0ms2	Ronnie	Lott	5454441515	2024-02-13	Fourth	Thomas Ultican	Male	64111	\N	003WD000002Yiv8YAC	\N	we-codekc/qpdndx7vjzq8zl6rwmit	https://res.cloudinary.com/dvryitnrx/image/upload/v1706904642/we-codekc/qpdndx7vjzq8zl6rwmit.webp
4b3c9168-9630-4a61-917b-98d92dbfb7b7	2024-02-16 00:07:25.735	2024-02-16 00:07:25.735	tanika.d.harris@gmail.com	$2b$12$6ORmXKBkklqLUo/GUjlZr.uFlMEvzAKTmVvAwZy.i6sBT563lVKOy	Caleb	Butler	9139980877	2013-02-04	Fifth	Lowell Brune Elementry	Male	66112	d08a29f2-aac9-49ed-8ce6-6ab36b009d01	003WD000002siNuYAI	Tanika + 9139980877	\N	\N
8d12af3f-fc97-4a52-9e1f-8db389a13215	2024-01-15 15:40:16.56	2024-01-15 15:40:16.56	hinesson@email.com	$2b$12$8GTrd7gWgsplBRXYYE8pGefcDFsDW5uS8XOvLiW4GPaUP67Cap6X2	HInes	Son	5551112222	2024-01-09	First	Northeast	Male	64111	fa8e993d-e227-4506-b044-533513a12ff9	003WD0000020rCrYAI	Mom 8164548989	\N	\N
1ba0919b-2a60-4ea2-babc-492af771747e	2024-01-15 21:21:00.374	2024-01-15 21:21:00.374	rasheedaughter@gmail.com	$2b$12$WAZ8/tQNe7PsFUnzpLoE9.Wu/zWzVVMHhB/FD3HBfXfTCphe39FNO	Rashee	Daughter	4566544444	2024-01-08	Junior	Northeast	PreferNotToSay	64111	c4faed3d-0cb6-43d3-97b8-6041c5d21af4	003WD0000028WSzYAM	Mom 8164548989	\N	\N
4840ea95-58d3-4891-94dd-238b7d3ed776	2024-02-16 00:04:50.043	2024-02-16 00:04:50.043	tanika.d.harris@gmail.com	$2b$12$nHfvVev/qO8SKxkUW8FOfO4k.rtIM99ZsoaVaxYSjXRUsGMsYA9ly	Corran	Butler	9139980877	2011-08-17	Seventh	Eisenhower middle school	Male	66112	d08a29f2-aac9-49ed-8ce6-6ab36b009d01	003WD000002shC1YAI	Tanika + 9139980877	\N	\N
24e37592-7eba-41f7-a338-6248fd9d807e	2024-01-15 21:23:09.762	2024-01-15 21:23:09.762	justinson@email.com	$2b$12$hgxpBYJveUIp97xweYihz.bhebBj5crY1EW9nlYRPYpF13lylArX.	Justin	Son	8885557777	2024-01-09	Sophomore	Northeast	Female	64111	a59ee873-20ca-4e77-9255-66ad8ff0abc5	003WD0000028WZRYA2	Mom 8164548989	\N	\N
c25829f1-4b1a-4832-9fc0-783e99a1913c	2024-01-16 17:21:00.203	2024-01-16 17:21:00.203	story.adrienne@gmail.com	$2b$12$U1iAy8HT0QZOBYaWSM6UIOzPvPAJWBvjyoGafOheXYsv1oTNiluri	Charles	Story	8164566890	2021-04-26	First	Blackburn Elementary	Male	64057	aef9a6c2-103b-415d-a902-9fb3c33d1160	003WD000002Ah0vYAC	Adrienne Story	\N	\N
215ca638-b236-487a-902b-b357b07b32dd	2024-02-16 23:05:28.428	2024-02-16 23:05:28.428	lilgates@email.com	$2b$12$J1clYFTMJbZCV5sGewOj/uMJF0GkYyTTSuyzGkGLs5ioLXKlpeGEW	James	Gates	3442236564	2024-01-29	Freshman	Northeast	Male	64111	b634faa0-7674-489c-9659-fc5a4e8c0f95	003WD000002uHTHYA2		we-codekc/fr0seo502lhlicg8pn81	https://res.cloudinary.com/dvryitnrx/image/upload/v1711403176/we-codekc/fr0seo502lhlicg8pn81.webp
12caff47-40ab-4953-aab8-9ceffe06e08b	2024-02-20 18:18:56.944	2024-02-20 18:18:56.944	bright@email.com	$2b$12$X.nl6fGqmT1RI7Sl3WtvCeoLtaGj8542lFKaY68i0XeLG3B5rdpHS	Bright	Jones	5558884545	2024-02-06	Seventh	Thomas Ultican	Male	64111	b634faa0-7674-489c-9659-fc5a4e8c0f95	003WD000002zJ9RYAU	Mom 8164548989	we-codekc/v8dcvwivl6lnxx3paduu	https://res.cloudinary.com/dvryitnrx/image/upload/v1708453271/we-codekc/v8dcvwivl6lnxx3paduu.jpg
86ebf309-3f2e-48b6-8ad9-4804838efb58	2024-01-13 18:41:10.249	2024-01-13 18:41:10.249	newemail@com.com	$2b$12$rP9IrFRCB3kAizTh2tag8OWG./dDyI2SBKwIGzTm8CCh6InhI75fq	光云	习	8165551111	2009-12-11	Fifth	County School 89	NonBinary	64068	850590cb-d0e9-4b4d-b754-fcea6df34a4c	003WD000001ZbXBYA0	borek43214@newcupon.com	\N	\N
1e092d3d-6e43-4596-b13f-fd9266866147	2024-03-07 00:05:20.745	2024-03-07 00:05:20.745	joeyjones@email.com	$2b$12$celd1j1ZqFXurZEK3hJJ8O.rvO/12acrl068Oa.I9h5SP1KYi/JjG	Joey	Jones	5461564545	2024-03-13	Sophomore	Northeast	Male	64105	864a1de7-dfbc-484d-abe5-44f4c62dfe19	003WD000003JLTdYAO	Mom 8164548989	we-codekc/f29gwqwl8i1hoeofkjab	https://res.cloudinary.com/dvryitnrx/image/upload/v1709921737/we-codekc/f29gwqwl8i1hoeofkjab.png
ab020bc0-0824-40fd-ab22-2edc1daf2c16	2024-01-17 20:08:47.416	2024-01-17 20:08:47.416	Jackson.intern@wecodekc.org	$2b$12$84HaXhVtIVEurPcrld1wzO3CjDlHVUYOO6epcBD1HvhsHeo7dWAoa	Jackson	Winsett	8165478387	2005-09-09	Senior	Lee's Summit West	Male	64082	b8881b4a-2a37-4bf0-9a60-78fe7ee3db58	003WD000002CHn7YAG	Jackson Winsett Jr. 816-674-6622	\N	\N
04fb9f21-8cb1-42f7-9216-4483f034a3cd	2024-03-07 00:06:06.243	2024-03-07 00:06:06.243	jonjones@email.com	$2b$12$qxo1vuovL460nuHA9xv87.YQeHgXL.r1c6AKNRr/sihRnzw.vix42	Jon	Jones	8641548545	2024-03-04	Fourth	Thomas Ultican	Male	64111	864a1de7-dfbc-484d-abe5-44f4c62dfe19	003WD000003JKUNYA4	Mom 8164548989	\N	\N
05211872-9de9-470e-b47d-34ff72af86b9	2024-01-18 18:37:04.864	2024-01-18 18:37:04.864	n.urban76@yahoo.com	$2b$12$PLks7twTdcMQxuC2hhbYt.m4ItY3PDws2Yca/eEeGhwVJSb0e7G5a	Kid	Urban	8169897777	2013-01-05	Freshman	Central	NonBinary	64128	884ed0af-8646-49f5-8951-82c44242c5f2	003WD000002DTpRYAW	Mom Dad	we-codekc/cqhrb89gnbtlcm9xpwpb	https://res.cloudinary.com/dvryitnrx/image/upload/v1705603151/we-codekc/cqhrb89gnbtlcm9xpwpb.png
4aeebb1c-af2e-4f25-8160-df1530e5eccc	2024-03-06 22:27:28.597	2024-03-06 22:27:28.597	toddtester@email.com	$2b$12$XBDA2vEvH6qL9sS1WdAxFOHo5HFttKK7XmzIJcUAPvMhdFBaKS/NK	Todd	Tester	6541524545	2024-03-11	Freshman	Thomas Ultican	NonBinary	64111	b634faa0-7674-489c-9659-fc5a4e8c0f95	003WD000003JHoDYAW	Mom 8164548989	we-codekc/v1zuqjhbkltdedu4paqb	https://res.cloudinary.com/dvryitnrx/image/upload/v1710601861/we-codekc/v1zuqjhbkltdedu4paqb.webp
aa8b55f8-a742-48c8-90e4-12935195f479	2024-02-27 20:44:21.103	2024-02-27 20:44:21.103	jimmy@email.com	$2b$12$dXKYCysDWqLleYVVNWkbi.eYCrYS07dL5ciQZvLDfUpoGnEeLaHaC	Jimmy	John	5689874565	2024-02-20	Sophomore	Northeast	NonBinary	64111	b634faa0-7674-489c-9659-fc5a4e8c0f95	003WD000003AHp3YAG	Mom 8164548989	we-codekc/avj4chdbrl9hwxtidjhh	https://res.cloudinary.com/dvryitnrx/image/upload/v1711403096/we-codekc/avj4chdbrl9hwxtidjhh.png
8307ae67-9780-417c-94c8-f362e22a8749	2024-01-27 19:09:14.119	2024-01-27 19:09:14.119	jack@email.com	$2b$12$DsU5XtNZVlMLdMn12Ppc5.aIuHqTRQ1r8QtmnGftAuEJTR0WDEiQ.	Jack	Willings	8166666666	2010-06-27	Seventh	Highbridge middle school	Male	64082	550cb829-7947-446f-bb93-29c4f9cf4b69	003WD000002S0K7YAK	Dad	\N	\N
3b204366-6502-4a1a-a2fe-2ba79d54994b	2024-03-09 04:29:17.699	2024-03-09 04:29:17.699	reynolds.scott@gmail.com	$2b$12$svhvjRqFyl3XTzgjrShW0uAiAjaOCfzGEQoIMEn4FW1gmltWCzLhS	Lucas	Reynolds	8167698759	2011-03-18	Seventh	Osage Trail Middle School	Male	64056	7908bc2a-59e6-4923-9e7e-d058274b5184	003WD000003N2x4YAC	Scott Reynolds 8167698759	\N	\N
6d43dbbb-da04-438d-a099-d4be7a7365e5	2024-03-09 18:02:44.687	2024-03-09 18:02:44.687	bobjones@email.com	$2b$12$hVF//CxxfZrS/nu3qEYDlOQnqeE2VrkExh3Qui436wSIFtm9/htY6	Bob	Jones	3438754545	2024-03-19	Fourth	Northeast	Female	64111	864a1de7-dfbc-484d-abe5-44f4c62dfe19	003WD000003NcOTYA0	Mom 8164548989	\N	\N
3076e200-d180-4f18-8e9f-51bf598ab150	2024-03-11 22:40:45.254	2024-03-11 22:40:45.254	natetaylor@email.com	$2b$12$kMvwXOFVNawk5EbibTpuLO9Jb5XXAGxTvphtQt.wOQY4HQHH/95NS	Nate	Taylor	8555554545	2024-03-11	Fourth	Thomas Ultican	Male	64111	\N	003WD000003Q64sYAC	\N	\N	\N
2c1fa320-f5c3-4c26-828a-7be6e8c06547	2024-03-11 22:31:32.355	2024-03-11 22:31:32.355	lot.okoli06@gmail.com	$2b$12$XvJ25wI/c0CAgtPLuj/gveJlI/3UrSTEL2z7F3R393rlAippthEv.	Lotanna	Okoli	8166635373	2006-08-14	Senior	Ewing Marion Kauffman School	Male	64123	\N	003WD000003Q5jtYAC	\N	we-codekc/krqhtgyybe0xwkrhbxjp	https://res.cloudinary.com/dvryitnrx/image/upload/v1710196415/we-codekc/krqhtgyybe0xwkrhbxjp.jpg
b9ca38b8-3bb9-47b9-8ff2-0036c36a0924	2024-03-11 23:03:39.64	2024-03-11 23:03:39.64	ginajones@email.com	$2b$12$kN/YdZNM42SRRFHKrPcAcexVcEZhul75PVsNaGefUc3m0yNZfm40W	Gina	Jones	2333333434	2024-03-11	Junior	Thomas Ultican1	Female	64111	864a1de7-dfbc-484d-abe5-44f4c62dfe19	003WD000003Q8Y5YAK	Mom 8164548989	\N	\N
65cb928a-7cd3-45fd-b744-2573a458f92f	2024-03-20 23:12:07.697	2024-03-20 23:12:07.697	testparentsemail@emailservice.net	$2b$12$d4LH8Hs4oU5Sc.zXzOyULegp9owd2/EwhstitCYEWSKgR9WHP8jju	TestStudent	Demonstration	7166179999	2009-10-10	Second	A School	Female	55667	3ca22386-c3a8-4013-9b08-eb3e6b194b5b	003WD000003Z893YAC	N/A	we-codekc/frmg39baocvax2wg4kov	https://res.cloudinary.com/dvryitnrx/image/upload/v1710976523/we-codekc/frmg39baocvax2wg4kov.png
c4596c7e-40e2-40c1-bca9-bb16539aaea2	2024-02-17 18:02:30.031	2024-02-17 18:02:30.031	janegates@email.com	$2b$12$QpydSx6ro/hmbgbRgaeMLeqs2r.JesOQ0spTUbQj3xocXzBn/nXj.	Jane	Gates	3439939393	2024-02-13	Sophomore	Thomas Ultican	Female	64111	b634faa0-7674-489c-9659-fc5a4e8c0f95	003WD000002vS1dYAE	Mom 8164548989	we-codekc/xwnibfuvxgctlxckntx1	https://res.cloudinary.com/dvryitnrx/image/upload/v1710552977/we-codekc/xwnibfuvxgctlxckntx1.webp
94097694-f14d-4759-bdcb-97f9281ce23c	2024-03-19 22:02:04.934	2024-03-19 22:02:04.934	janedaughter@email.com	$2b$12$5gaA009Aq1PKcAKPzdYVVu5D4tTVBCw/R54Ndi94kfsNb0zgFEXrS	Jane	Daughter	3445673455	2024-03-06	Freshman	Thomas Ultican	Male	64111	4e85b51a-e4f3-4680-875f-9b73b8abff71	003WD000003XyjfYAC	Mom 8164548989	we-codekc/sf2fs9jez3x6jfvrrluu	https://res.cloudinary.com/dvryitnrx/image/upload/v1710887144/we-codekc/sf2fs9jez3x6jfvrrluu.webp
\.


--
--

COPY public.student_knowledge (id, created_at, updated_at, grade, skills, "studentId", "classId", verify, "verifiedDate", "adminId", date) FROM stdin;
bd756bc5-8c6f-4dd4-8cf8-b72d2656e687	2024-02-26 21:57:36.942	2024-02-26 21:57:36.942	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	d073cb9a-d4e1-44c5-b75c-597dfb40c05d	2024-02-26 00:00:00
7e6fea5d-8691-4127-abf5-0f4c635d0a47	2024-02-27 20:20:36.513	2024-02-27 20:20:36.513	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-02-27 20:20:35.301
f944cd3c-dd2a-4069-9cf0-61f20da1e698	2024-02-27 20:20:55.333	2024-02-27 20:20:55.333	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-02-27 20:20:54.098
06a229dd-addf-4b0f-8dda-dbf6e2c4d6e1	2024-02-27 20:20:58.785	2024-02-27 20:20:58.785	\N	\N	12caff47-40ab-4953-aab8-9ceffe06e08b	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-02-27 20:20:58.754
44fed29b-da67-475f-877f-3de46d0ffa97	2024-02-27 20:21:06.629	2024-02-27 20:21:06.629	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	01453bc6-dc3d-4793-8351-1cc554bc9729	f	\N	\N	2024-02-27 20:21:06.57
220d8185-e460-4a5b-9529-b33b26e6be32	2024-02-27 20:21:09.902	2024-02-27 20:21:09.902	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	01453bc6-dc3d-4793-8351-1cc554bc9729	f	\N	\N	2024-02-27 20:21:09.785
2e7693eb-0b94-488b-804f-4a78eadd75a0	2024-02-27 20:21:12.503	2024-02-27 20:21:12.503	\N	\N	12caff47-40ab-4953-aab8-9ceffe06e08b	01453bc6-dc3d-4793-8351-1cc554bc9729	f	\N	\N	2024-02-27 20:21:12.378
532808fc-002f-4a09-adc2-cc74397305a3	2024-02-27 20:28:53.961	2024-02-27 20:28:53.961	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-02-27 20:28:53.874
9f1d2ee8-aa81-4521-9d19-8a27d0e21a98	2024-02-27 20:41:29.84	2024-02-27 20:41:29.84	\N	\N	12caff47-40ab-4953-aab8-9ceffe06e08b	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-02-27 20:41:29.868
224afd77-29d9-4aaa-a5a6-9e34c01f3562	2024-03-09 04:30:19.035	2024-03-09 04:30:19.035	\N	\N	3b204366-6502-4a1a-a2fe-2ba79d54994b	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-03-16 00:00:00
928ccb5d-5ba9-46e9-afc8-16a492ce2616	2024-02-29 18:59:23.256	2024-02-29 18:59:23.256	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-02 00:00:00
e06efa3e-2ff1-4c25-8f30-65cef8adfc30	2024-03-04 22:32:17.241	2024-03-04 22:32:17.241	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-04 00:00:00
7395e9f5-9023-4712-b1fe-2cf4b75cf468	2024-02-27 20:49:54.024	2024-02-27 20:49:54.024	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-02-29 06:00:00
99902e13-9cd6-4f19-acf3-4e83baf12fd8	2024-02-27 20:36:42.328	2024-02-27 20:36:42.328	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	01453bc6-dc3d-4793-8351-1cc554bc9729	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-02-28 06:00:00
faa8d478-743c-404c-bb13-49baa7bb1445	2024-03-05 00:38:27.027	2024-03-05 00:38:27.027	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-05 00:00:00
90a930ef-340b-4638-9553-9284e0e60169	2024-03-09 04:31:26.305	2024-03-09 04:31:26.305	\N	\N	3b204366-6502-4a1a-a2fe-2ba79d54994b	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-03-23 00:00:00
393493ff-b123-404d-be93-49734b862325	2024-03-09 04:31:39.281	2024-03-09 04:31:39.281	\N	\N	3b204366-6502-4a1a-a2fe-2ba79d54994b	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-04-06 00:00:00
26789c19-0a39-4b87-ae71-30802c520e5f	2024-03-05 21:14:22.348	2024-03-05 21:14:22.348	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-03-06 00:00:00
bb7d9bab-dfcf-4da5-ac46-1d7816ab35fb	2024-03-11 21:13:12.585	2024-03-11 21:13:12.585	\N	\N	04fb9f21-8cb1-42f7-9216-4483f034a3cd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-11 00:00:00
d17f231c-d8d1-4e9e-b795-557fca8ae147	2024-03-05 21:31:19.349	2024-03-05 21:31:19.349	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-07 00:00:00
6331dcb7-7749-467f-bdfb-baac44ec3987	2024-03-11 21:18:49.15	2024-03-11 21:18:49.15	\N	\N	6d43dbbb-da04-438d-a099-d4be7a7365e5	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-11 00:00:00
a4b3ece1-93ad-4416-8204-71afa68520ef	2024-03-20 23:20:29.36	2024-03-20 23:20:29.36	\N	\N	4aeebb1c-af2e-4f25-8160-df1530e5eccc	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-24 00:00:00
a066f35d-9e2c-41cc-80c4-890e35bcc072	2024-03-09 18:15:11.881	2024-03-09 18:15:11.881	\N	\N	6d43dbbb-da04-438d-a099-d4be7a7365e5	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-31 00:00:00
4fca928c-baac-429a-859b-db0613f25cc3	2024-03-05 21:14:29.319	2024-03-05 21:14:29.319	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-09 00:00:00
1a65a61f-426a-478c-b714-dc8c55220812	2024-03-06 22:18:21.013	2024-03-06 22:18:21.013	\N	\N	12caff47-40ab-4953-aab8-9ceffe06e08b	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-08 00:00:00
cb913962-b7e0-46d7-8866-bb37c96657a8	2024-03-09 18:41:16.636	2024-03-09 18:41:16.636	\N	\N	6d43dbbb-da04-438d-a099-d4be7a7365e5	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-14 00:00:00
ec69c2ff-7abf-4f08-86fc-cf7d7a2d108d	2024-03-05 21:14:35.021	2024-03-05 21:14:35.021	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-11 00:00:00
688a186f-fb16-4ad1-a731-c2c733b3b303	2024-03-09 18:03:07.703	2024-03-09 18:03:07.703	\N	\N	6d43dbbb-da04-438d-a099-d4be7a7365e5	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-10 00:00:00
77f9f8b0-10c0-4862-a0a1-379a0bd4216f	2024-03-06 22:25:18.524	2024-03-06 22:25:18.524	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-10 00:00:00
0e8d3577-d8c2-4fb6-a9ea-18bf6b7e95a9	2024-03-11 20:38:29.39	2024-03-11 20:38:29.39	\N	\N	1e092d3d-6e43-4596-b13f-fd9266866147	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-14 00:00:00
7b04ce47-a26f-43ba-ac31-82c8ee89712a	2024-03-11 20:42:40.91	2024-03-11 20:42:40.91	\N	\N	04fb9f21-8cb1-42f7-9216-4483f034a3cd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-31 00:00:00
c631f181-3ecb-47cd-959b-fe02fc1b1020	2024-03-05 21:14:46.227	2024-03-05 21:14:46.227	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-13 00:00:00
a1ded12f-3f04-48e6-a3e2-b811bbb2f7d3	2024-03-11 21:03:19.219	2024-03-11 21:03:19.219	\N	\N	1e092d3d-6e43-4596-b13f-fd9266866147	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-11 00:00:00
c39b7e47-9cc7-4245-ab20-46790f528251	2024-03-11 22:11:13.489	2024-03-11 22:11:13.489	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-03-16 00:00:00
38d02fb2-0a18-4555-bd11-befaf65dfcd7	2024-03-11 22:11:26.558	2024-03-11 22:11:26.558	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-04-10 00:00:00
cd72aca9-6b2b-4abc-85a4-93ca38cb051a	2024-03-11 22:11:42.64	2024-03-11 22:11:42.64	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	f	\N	\N	2024-04-03 00:00:00
8203392a-6a41-40c4-8fca-85975acd0a2b	2024-03-11 23:04:03.065	2024-03-11 23:04:03.065	\N	\N	b9ca38b8-3bb9-47b9-8ff2-0036c36a0924	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-11 00:00:00
029fef36-ac6a-47ed-b241-816e8dc576b9	2024-03-11 23:10:49.916	2024-03-11 23:10:49.916	\N	\N	2c1fa320-f5c3-4c26-828a-7be6e8c06547	b6924da1-fcdd-43da-b6a4-8b503045d94c	f	\N	\N	2024-03-16 00:00:00
65eb8a12-eb78-400f-b25f-ffb0a4c48459	2024-03-09 18:55:56.489	2024-03-09 18:55:56.489	\N	\N	1e092d3d-6e43-4596-b13f-fd9266866147	4bb2edc8-6a08-4e15-aea0-3b5b9f9a17a3	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-04-03 00:00:00
bfda0828-8aae-43f6-b6e9-1d4bf776ffe0	2024-03-12 05:15:05.94	2024-03-12 05:15:05.94	\N	\N	04fb9f21-8cb1-42f7-9216-4483f034a3cd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-24 00:00:00
fd0d54e4-a819-4d1a-8e91-2e7ec3395f0e	2024-03-07 18:49:16.052	2024-03-07 18:49:16.052	\N	\N	1e092d3d-6e43-4596-b13f-fd9266866147	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-31 00:00:00
de9a7c18-822e-4458-acfa-3584f9ae8afe	2024-03-12 05:15:14.026	2024-03-12 05:15:14.026	\N	\N	04fb9f21-8cb1-42f7-9216-4483f034a3cd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-14 00:00:00
41d9bc5b-616b-4833-adcc-af466d50fdc3	2024-03-07 18:51:13.983	2024-03-07 18:51:13.983	\N	\N	1e092d3d-6e43-4596-b13f-fd9266866147	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-24 00:00:00
38511a4f-756c-4983-9396-fd8dbdc9d7db	2024-03-09 18:03:22.775	2024-03-09 18:03:22.775	\N	\N	6d43dbbb-da04-438d-a099-d4be7a7365e5	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-24 00:00:00
abb02bd5-2fd4-4905-85dd-cf0ffd74c9e1	2024-03-20 23:13:15.236	2024-03-20 23:13:15.236	\N	\N	65cb928a-7cd3-45fd-b744-2573a458f92f	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-24 00:00:00
a500b2da-0128-4153-bc3c-dadde4d6e97c	2024-03-07 19:00:05.646	2024-03-07 19:00:05.646	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-14 00:00:00
92424cb0-a626-4c03-a307-6c74e99cd8ab	2024-03-20 23:15:14.049	2024-03-20 23:15:14.049	\N	\N	c4596c7e-40e2-40c1-bca9-bb16539aaea2	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-31 00:00:00
6bd9b426-5965-4e6e-9da1-24efacf90e68	2024-03-20 23:20:45.905	2024-03-20 23:20:45.905	\N	\N	4aeebb1c-af2e-4f25-8160-df1530e5eccc	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-31 00:00:00
a6dc26e7-8414-4ab5-aba7-bb5359c69de0	2024-03-22 21:59:41.486	2024-03-22 21:59:41.486	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-23 00:00:00
c38f7a22-021e-4132-9b91-92705e24fc6d	2024-03-21 20:28:44.154	2024-03-21 20:28:44.154	\N	\N	aa8b55f8-a742-48c8-90e4-12935195f479	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-22 00:00:00
54278b43-3511-487d-82a6-872557f7dbeb	2024-03-20 23:49:53.381	2024-03-20 23:49:53.381	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-31 00:00:00
fdaa6ba9-7ece-442c-8a8b-e0fa239afd0c	2024-03-20 23:50:06.052	2024-03-20 23:50:06.052	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-24 00:00:00
e633c50e-d8da-42a5-a45d-eea17ef34028	2024-02-27 00:37:23.718	2024-02-27 00:37:23.718	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	c74d0a1a-2b6f-4b25-a9ad-900cba5c35b1	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-02-27 00:00:00
81bbd1e7-6b5b-43a5-9b43-f611423c797a	2024-03-21 20:50:06.741	2024-03-21 20:50:06.741	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-21 00:00:00
bef5385b-4b6a-448d-a151-fc221ac4261d	2024-03-20 23:15:30.535	2024-03-20 23:15:30.535	\N	\N	aa8b55f8-a742-48c8-90e4-12935195f479	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-24 00:00:00
e6b32fea-5ea8-4d79-b2e2-43da50f8b444	2024-03-21 20:27:56.212	2024-03-21 20:27:56.212	\N	\N	aa8b55f8-a742-48c8-90e4-12935195f479	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-21 00:00:00
bd37cf8e-0e6f-402a-907f-e5257d770b2d	2024-03-20 23:49:05.977	2024-03-20 23:49:05.977	\N	\N	aa8b55f8-a742-48c8-90e4-12935195f479	5548805a-69e4-481c-8463-bb49bea1c330	t	\N	9c371671-329e-4568-90df-5a7e7477da12	2024-03-31 00:00:00
64277c39-f15d-432f-bb91-56d5590b591d	2024-03-22 22:23:28.2	2024-03-22 22:23:28.2	\N	\N	12caff47-40ab-4953-aab8-9ceffe06e08b	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-31 00:00:00
b59a6600-6fe6-468d-a89e-7f4e2d30e6b5	2024-03-22 22:35:58.913	2024-03-22 22:35:58.913	\N	\N	215ca638-b236-487a-902b-b357b07b32dd	5548805a-69e4-481c-8463-bb49bea1c330	f	\N	\N	2024-03-22 00:00:00
\.


--
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_3d8017e1cb58429474a3c0419ghgh4" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.student_knowledge
    ADD CONSTRAINT "PK_4159ba98b65a20a8d1f257bc514" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.demographic_info
    ADD CONSTRAINT "PK_b433de03c16df6e2938ba93b29e" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY (id);


--
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
--

CREATE UNIQUE INDEX "REL_58da1e5e410ef2ba35d6944ade" ON public.parent USING btree ("demographicInfoId");


--
--

CREATE UNIQUE INDEX "UQ_1f3940af28a76098f31004f03ca" ON public.classes USING btree (name);


--
--

CREATE UNIQUE INDEX admin_email_key ON public.admin USING btree (email);


--
--

CREATE UNIQUE INDEX "parent_salesforceId_key" ON public.parent USING btree ("salesforceId");


--
--

CREATE UNIQUE INDEX "student_salesforceId_key" ON public.student USING btree ("salesforceId");


--
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT "FK_58da1e5e410ef2ba35d6944ade5" FOREIGN KEY ("demographicInfoId") REFERENCES public.demographic_info(id);


--
--

ALTER TABLE ONLY public.student_knowledge
    ADD CONSTRAINT "FK_5d9bbc4ee7cf0682ffc455bf0a0" FOREIGN KEY ("studentId") REFERENCES public.student(id) ON DELETE CASCADE;


--
--

ALTER TABLE ONLY public.student_knowledge
    ADD CONSTRAINT "FK_6ba1ffbe524f3191da99ebfc4d6" FOREIGN KEY ("classId") REFERENCES public.classes(id);


--
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "FK_d728e971c60c58a818dd9e614ab" FOREIGN KEY ("parentId") REFERENCES public.parent(id) ON DELETE CASCADE;


--
--

ALTER TABLE ONLY public.student_knowledge
    ADD CONSTRAINT "student_knowledge_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admin(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

