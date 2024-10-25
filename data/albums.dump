--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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
-- Name: album; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.album (
    album_id integer NOT NULL,
    album_title character varying(100) NOT NULL,
    release_year integer NOT NULL,
    number_of_singles integer NOT NULL,
    genre_name character varying(100) NOT NULL,
    style_name character varying(100) NOT NULL,
    rlabel_name character varying(100) NOT NULL,
    country_name character varying(100) NOT NULL,
    type_name character varying(100) NOT NULL,
    CONSTRAINT album_number_of_singles_check CHECK ((number_of_singles >= 0)),
    CONSTRAINT album_release_year_check CHECK (((release_year > 0) AND (release_year <= 2100)))
);


ALTER TABLE public.album OWNER TO postgres;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    country_name character varying(100) NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    genre_name character varying(100) NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- Name: performed_by; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performed_by (
    album_id integer NOT NULL,
    artist_name character varying(100) NOT NULL
);


ALTER TABLE public.performed_by OWNER TO postgres;

--
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    artist_name character varying(100) NOT NULL,
    first_name character varying(100),
    last_name character varying(100)
);


ALTER TABLE public.person OWNER TO postgres;

--
-- Name: produced_by; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produced_by (
    album_id integer NOT NULL,
    artist_name character varying(100) NOT NULL
);


ALTER TABLE public.produced_by OWNER TO postgres;

--
-- Name: rlabel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rlabel (
    rlabel_name character varying(100) NOT NULL
);


ALTER TABLE public.rlabel OWNER TO postgres;

--
-- Name: song; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song (
    song_title character varying(100) NOT NULL,
    track_number integer NOT NULL,
    duration integer NOT NULL,
    album_id integer NOT NULL,
    CONSTRAINT song_duration_check CHECK ((duration > 0))
);


ALTER TABLE public.song OWNER TO postgres;

--
-- Name: style; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.style (
    style_name character varying(100) NOT NULL
);


ALTER TABLE public.style OWNER TO postgres;

--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    type_name character varying(100) NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Data for Name: album; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.album (album_id, album_title, release_year, number_of_singles, genre_name, style_name, rlabel_name, country_name, type_name) FROM stdin;
1	A Rainbow in Curved Air	1969	2	Minimal	Minimal Ambient	Columbia Masterworks	United States of America	Studio Album
2	The Velvet Underground & Nico	1967	2	Rock	Experimental Rock	Verve Records	United States of America	Studio Album
3	Bathing Beach	2017	1	Indie Folk	Ambient Folk	AllPoints	United Kingdom	EP
4	Stranger in the Alps	2017	3	Indie Rock	Sadcore	Dead Oceans	United States of America	Studio Album
5	blisters	2016	0	R&B	Gospel	Tri Angle	United States of America	Studio Album
6	Mother Earth's Plantasia	1976	0	Electronic	Experimental	Homewood Records	United States of America	Studio Album
7	Trans Harmonic Nights	1979	0	Electronic	Berlin-School	Virgin Records	Germany	Studio Album
8	Music Has A Right To Children	1998	1	Electronic	IDM	Rough Trade	Germany	Studio Album
9	69 Love Songs Vol. 1	1999	0	Indie	Synth-pop	Merge Records	United States of America	Studio Album
10	69 Love Songs Vol. 2	1999	0	Indie	Synth-pop	Merge Records	United States of America	Studio Album
11	69 Love Songs Vol. 3	1999	0	Indie	Synth-pop	Merge Records	United States of America	Studio Album
12	Läuten der Seele	2022	0	Electronic	Ambient	Hands in the Dark	France	Studio Album
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (country_name) FROM stdin;
United States of America
United Kingdom
Germany
France
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (genre_name) FROM stdin;
Minimal
Rock
Indie Folk
Indie Rock
R&B
Electronic
IDM
Indie
\.


--
-- Data for Name: performed_by; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.performed_by (album_id, artist_name) FROM stdin;
1	Terry Riley
2	The Velvet Underground
2	Nico
3	Novo Amor
4	Phoebe Bridgers
5	Serpentwithfeet
6	Mort Garson
7	Peter Baumann
8	Boards of Canada
9	The Magnetic Fields
10	The Magnetic Fields
11	The Magnetic Fields
12	Läuten der Seele
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (artist_name, first_name, last_name) FROM stdin;
Terry Riley	Terry	Riley
David Behrman	David	Behrman
The Velvet Underground	\N	\N
Nico	Christa	Päffgen
Andy Warhol	Andy	Warhol
Novo Amor	Ali	Lacey
Tony Berg	Tony	Berg
Phoebe Bridgers	Phoebe	Bridgers
The Haxan Cloak	Bobby	Krlic
Serpentwithfeet	Jonathan Josiah	White
Mort Garson	Mort	Garson
Peter Baumann	Peter	Baumann
Boards of Canada	\N	\N
The Magnetic Fields	\N	\N
Läuten der Seele	\N	\N
\.


--
-- Data for Name: produced_by; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produced_by (album_id, artist_name) FROM stdin;
1	David Behrman
2	The Velvet Underground
2	Andy Warhol
3	Novo Amor
4	Tony Berg
5	The Haxan Cloak
6	Mort Garson
7	Peter Baumann
8	Boards of Canada
9	The Magnetic Fields
10	The Magnetic Fields
11	The Magnetic Fields
12	Läuten der Seele
\.


--
-- Data for Name: rlabel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rlabel (rlabel_name) FROM stdin;
Columbia Masterworks
Verve Records
AllPoints
Dead Oceans
Tri Angle
Homewood Records
Virgin Records
Rough Trade
Merge Records
Hands in the Dark
\.


--
-- Data for Name: song; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.song (song_title, track_number, duration, album_id) FROM stdin;
A Rainbow in Curved Air	1	1127	1
Poppy Nogood and the Phantom Band	2	1300	1
Sunday Morning	1	173	2
I'm Waiting for the Man	2	277	2
Femme Fatale	3	155	2
Venus In Furs	4	307	2
Run Run Run	5	258	2
All Tomorrow's Parties	6	355	2
Heroin	7	425	2
There She Goes Again	8	150	2
I'll Be Your Mirror	9	121	2
The Black Angel's Death Song	10	190	2
European Son	11	460	2
Carry You	5	273	3
Colourway	6	228	3
Anchor	7	257	3
Embody Me	8	190	3
Smoke Signals	1	326	4
Motion Sickness	2	230	4
Funeral	3	232	4
Demi Moore	4	199	4
Scott Street	5	305	4
Killer	6	189	4
Georgia	7	247	4
Chelsea	8	282	4
Would You Rather	9	199	4
You Missed My Heart	10	417	4
Smoke Signals (Reprise)	11	36	4
Blisters	1	409	5
Flickering	2	269	5
Four Ethers	3	269	5
Penance	4	167	5
Redemption	5	157	5
Plantasia	1	201	6
Symphony For A Spider Plant	2	160	6
Baby's Tears Blues	3	181	6
Ode To An African Violet	4	241	6
Concerto For Philodendron & Pothos	5	184	6
Rhapsody In Green	6	204	6
Swingin' Spathiphyllums	7	177	6
You Don't Have To Walk A Begonia	8	153	6
A Mellow Mood For Maidenhair	9	137	6
Music To Soothe The Savage Snake Plant	10	199	6
This Day	1	315	7
White Bench and Black Beach	2	333	7
Chasing the Dream	3	280	7
Biking Up the Strand	4	149	7
Phaseday	5	355	7
Meridian Moorland	6	209	7
The Third Site	7	386	7
Dance at Dawn	8	238	7
Wildlife Analysis	1	77	8
An Eagle In Your Mind	2	382	8
The Color Of The Fire	3	105	8
Telephasic Workshop	4	395	8
Triangles & Rhombuses	5	109	8
Sixtyten	6	348	8
Turquoise Hexagon Sun	7	308	8
Kaini Industries	8	59	8
Bocuma	9	96	8
Roygbiv	10	150	8
Rue The Whirl	11	400	8
Aquarius	12	357	8
Olson	13	89	8
Pete Standing Alone	14	367	8
Smokes Quantity	15	187	8
Open The Light	16	265	8
One Very Important Thought	17	75	8
Absolutely Cuckoo	1	94	9
I Don't Believe In The Sun	2	256	9
All My Little Words	3	166	9
A Chicken With Its Head Cut Off	4	161	9
Reno Dakota	5	65	9
I Don't Want To Get Over You	6	142	9
Come Back From San Francisco	7	168	9
The Luckiest Guy On The Lower East Side	8	223	9
Let's Pretend We're Bunny Rabbits	9	145	9
The Cactus Where Your Heart Should Be	10	71	9
I Think I Need A New Heart	11	152	9
The Book Of Love	12	162	9
Fido, Your Leash Is Too Long	13	153	9
How Fucking Romantic	14	58	9
The One You Really Love	15	173	9
Punk Love	16	58	9
Parades Go By	17	176	9
Boa Constrictor	18	58	9
A Pretty Girl Is Like...	19	110	9
My Sentimental Melody	20	187	9
Nothing Matters When We're Dancing	21	147	9
Sweet-Lovin' Man	22	299	9
The Things We Did And Didn't Do	23	131	9
Roses	1	27	10
Love Is Like Jazz	2	176	10
When My Boy Walks Down The Street	3	158	10
Time Enough For Rocking When We're Old	4	123	10
Very Funny	5	86	10
Grand Canyon	6	148	10
No One Will Ever Love You	7	194	10
If You Don't Cry	8	187	10
You're My Only Home	9	137	10
(Crazy For You But) Not That Crazy	10	138	10
My Only Friend	11	121	10
Promises Of Eternity	12	226	10
World Love	13	187	10
Washington, D.C.	14	113	10
Long-Forgotten Fairytale	15	217	10
Kiss Me Like You Mean It	16	121	10
Papa Was A Rodeo	17	301	10
Epitaph For My Heart	18	170	10
Asleep And Dreaming	19	113	10
The Sun Goes Down And The World Goes Dancing	20	166	10
The Way You Say Good-Night	21	164	10
Abigail, Belle Of Kilronan	22	120	10
I Shatter	23	189	10
Underwear	1	169	11
It's A Crime	2	234	11
Busby Berkeley Dreams	3	216	11
I'm Sorry I Love You	4	186	11
Acoustic Guitar	5	157	11
The Death Of Ferdinand De Saussure	6	191	11
Love In The Shadows	7	174	11
Bitter Tears	8	171	11
Wi' Nae Wee Bairn Ye'll Me Beget	9	115	11
Yeah! Oh, Yeah!	10	139	11
Experimental Music Love	11	29	11
Meaningless	12	128	11
Love Is Like A Bottle Of Gin	13	106	11
Queen Of The Savages	14	132	11
Blue You	15	183	11
I Can't Touch You Anymore	16	185	11
Two Kinds Of People	17	70	11
How To Say Goodbye	18	168	11
The Night You Can't Remember	19	137	11
For We Are The King Of The Boudoir	20	74	11
Strange Eyes	21	121	11
Xylophone Track	22	167	11
Zebra	23	135	11
Die Welt durchs grüne Glas	1	53	12
Kläranlagengesang 1	2	62	12
Das Biotop im Traum und in der Wirklichkeit	3	221	12
Millionen Nachtigallen schlagen	4	74	12
Ich ging durch einen grasgrünen Wald	5	157	12
Merkwürdige Vögel erscheinen im Garten	6	194	12
Irres Flackern vor den Altglascontainern	7	418	12
Strahlenkranz Schweinfurt	8	233	12
Kläranlagengesang 2	9	152	12
Erdrutsch an der Bushaltestelle	10	293	12
Unendlicher Trost	11	110	12
Gedanken der Mückenlarven in der Regentonne bei Vollmond	12	380	12
\.


--
-- Data for Name: style; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.style (style_name) FROM stdin;
Minimal Ambient
Experimental Rock
Ambient Folk
Sadcore
Gospel
Experimental
Berlin-School
IDM
Synth-pop
Ambient
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (type_name) FROM stdin;
Studio Album
EP
\.


--
-- Name: album album_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (album_id);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_name);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (genre_name);


--
-- Name: performed_by performed_by_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_pkey PRIMARY KEY (album_id, artist_name);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (artist_name);


--
-- Name: produced_by produced_by_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_pkey PRIMARY KEY (album_id, artist_name);


--
-- Name: rlabel rlabel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rlabel
    ADD CONSTRAINT rlabel_pkey PRIMARY KEY (rlabel_name);


--
-- Name: song song_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_pkey PRIMARY KEY (track_number, album_id);


--
-- Name: style style_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.style
    ADD CONSTRAINT style_pkey PRIMARY KEY (style_name);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (type_name);


--
-- Name: album album_country_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_country_name_fkey FOREIGN KEY (country_name) REFERENCES public.country(country_name);


--
-- Name: album album_genre_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_genre_name_fkey FOREIGN KEY (genre_name) REFERENCES public.genre(genre_name);


--
-- Name: album album_rlabel_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_rlabel_name_fkey FOREIGN KEY (rlabel_name) REFERENCES public.rlabel(rlabel_name);


--
-- Name: album album_style_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_style_name_fkey FOREIGN KEY (style_name) REFERENCES public.style(style_name);


--
-- Name: album album_type_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_type_name_fkey FOREIGN KEY (type_name) REFERENCES public.type(type_name);


--
-- Name: performed_by performed_by_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);


--
-- Name: performed_by performed_by_artist_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_artist_name_fkey FOREIGN KEY (artist_name) REFERENCES public.person(artist_name);


--
-- Name: produced_by produced_by_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);


--
-- Name: produced_by produced_by_artist_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_artist_name_fkey FOREIGN KEY (artist_name) REFERENCES public.person(artist_name);


--
-- Name: song song_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);


--
-- PostgreSQL database dump complete
--

