PGDMP  *                 	    |           Albums    16.4    16.4 ,    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24754    Albums    DATABASE     ~   CREATE DATABASE "Albums" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Croatian_Croatia.1250';
    DROP DATABASE "Albums";
                postgres    false            �            1259    24785    album    TABLE     [  CREATE TABLE public.album (
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
    DROP TABLE public.album;
       public         heap    postgres    false            �            1259    24775    country    TABLE     R   CREATE TABLE public.country (
    country_name character varying(100) NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false            �            1259    24760    genre    TABLE     N   CREATE TABLE public.genre (
    genre_name character varying(100) NOT NULL
);
    DROP TABLE public.genre;
       public         heap    postgres    false            �            1259    24845    performed_by    TABLE     u   CREATE TABLE public.performed_by (
    album_id integer NOT NULL,
    artist_name character varying(100) NOT NULL
);
     DROP TABLE public.performed_by;
       public         heap    postgres    false            �            1259    24755    person    TABLE     �   CREATE TABLE public.person (
    artist_name character varying(100) NOT NULL,
    first_name character varying(100),
    last_name character varying(100)
);
    DROP TABLE public.person;
       public         heap    postgres    false            �            1259    24830    produced_by    TABLE     t   CREATE TABLE public.produced_by (
    album_id integer NOT NULL,
    artist_name character varying(100) NOT NULL
);
    DROP TABLE public.produced_by;
       public         heap    postgres    false            �            1259    24770    rlabel    TABLE     P   CREATE TABLE public.rlabel (
    rlabel_name character varying(100) NOT NULL
);
    DROP TABLE public.rlabel;
       public         heap    postgres    false            �            1259    24819    song    TABLE     �   CREATE TABLE public.song (
    song_title character varying(100) NOT NULL,
    track_number integer NOT NULL,
    duration integer NOT NULL,
    album_id integer NOT NULL,
    CONSTRAINT song_duration_check CHECK ((duration > 0))
);
    DROP TABLE public.song;
       public         heap    postgres    false            �            1259    24765    style    TABLE     N   CREATE TABLE public.style (
    style_name character varying(100) NOT NULL
);
    DROP TABLE public.style;
       public         heap    postgres    false            �            1259    24780    type    TABLE     L   CREATE TABLE public.type (
    type_name character varying(100) NOT NULL
);
    DROP TABLE public.type;
       public         heap    postgres    false            �          0    24785    album 
   TABLE DATA           �   COPY public.album (album_id, album_title, release_year, number_of_singles, genre_name, style_name, rlabel_name, country_name, type_name) FROM stdin;
    public          postgres    false    221   Q3       �          0    24775    country 
   TABLE DATA           /   COPY public.country (country_name) FROM stdin;
    public          postgres    false    219   T5       �          0    24760    genre 
   TABLE DATA           +   COPY public.genre (genre_name) FROM stdin;
    public          postgres    false    216   �5       �          0    24845    performed_by 
   TABLE DATA           =   COPY public.performed_by (album_id, artist_name) FROM stdin;
    public          postgres    false    224   �5       �          0    24755    person 
   TABLE DATA           D   COPY public.person (artist_name, first_name, last_name) FROM stdin;
    public          postgres    false    215   �6       �          0    24830    produced_by 
   TABLE DATA           <   COPY public.produced_by (album_id, artist_name) FROM stdin;
    public          postgres    false    223   �7       �          0    24770    rlabel 
   TABLE DATA           -   COPY public.rlabel (rlabel_name) FROM stdin;
    public          postgres    false    218   �8       �          0    24819    song 
   TABLE DATA           L   COPY public.song (song_title, track_number, duration, album_id) FROM stdin;
    public          postgres    false    222   9       �          0    24765    style 
   TABLE DATA           +   COPY public.style (style_name) FROM stdin;
    public          postgres    false    217   �B       �          0    24780    type 
   TABLE DATA           )   COPY public.type (type_name) FROM stdin;
    public          postgres    false    220   mC       M           2606    24793    album album_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (album_id);
 :   ALTER TABLE ONLY public.album DROP CONSTRAINT album_pkey;
       public            postgres    false    221            I           2606    24779    country country_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_name);
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    219            C           2606    24764    genre genre_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (genre_name);
 :   ALTER TABLE ONLY public.genre DROP CONSTRAINT genre_pkey;
       public            postgres    false    216            S           2606    24849    performed_by performed_by_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_pkey PRIMARY KEY (album_id, artist_name);
 H   ALTER TABLE ONLY public.performed_by DROP CONSTRAINT performed_by_pkey;
       public            postgres    false    224    224            A           2606    24759    person person_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (artist_name);
 <   ALTER TABLE ONLY public.person DROP CONSTRAINT person_pkey;
       public            postgres    false    215            Q           2606    24834    produced_by produced_by_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_pkey PRIMARY KEY (album_id, artist_name);
 F   ALTER TABLE ONLY public.produced_by DROP CONSTRAINT produced_by_pkey;
       public            postgres    false    223    223            G           2606    24774    rlabel rlabel_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.rlabel
    ADD CONSTRAINT rlabel_pkey PRIMARY KEY (rlabel_name);
 <   ALTER TABLE ONLY public.rlabel DROP CONSTRAINT rlabel_pkey;
       public            postgres    false    218            O           2606    24824    song song_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_pkey PRIMARY KEY (track_number, album_id);
 8   ALTER TABLE ONLY public.song DROP CONSTRAINT song_pkey;
       public            postgres    false    222    222            E           2606    24769    style style_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.style
    ADD CONSTRAINT style_pkey PRIMARY KEY (style_name);
 :   ALTER TABLE ONLY public.style DROP CONSTRAINT style_pkey;
       public            postgres    false    217            K           2606    24784    type type_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (type_name);
 8   ALTER TABLE ONLY public.type DROP CONSTRAINT type_pkey;
       public            postgres    false    220            T           2606    24809    album album_country_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_country_name_fkey FOREIGN KEY (country_name) REFERENCES public.country(country_name);
 G   ALTER TABLE ONLY public.album DROP CONSTRAINT album_country_name_fkey;
       public          postgres    false    219    4681    221            U           2606    24794    album album_genre_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_genre_name_fkey FOREIGN KEY (genre_name) REFERENCES public.genre(genre_name);
 E   ALTER TABLE ONLY public.album DROP CONSTRAINT album_genre_name_fkey;
       public          postgres    false    216    221    4675            V           2606    24804    album album_rlabel_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_rlabel_name_fkey FOREIGN KEY (rlabel_name) REFERENCES public.rlabel(rlabel_name);
 F   ALTER TABLE ONLY public.album DROP CONSTRAINT album_rlabel_name_fkey;
       public          postgres    false    221    218    4679            W           2606    24799    album album_style_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_style_name_fkey FOREIGN KEY (style_name) REFERENCES public.style(style_name);
 E   ALTER TABLE ONLY public.album DROP CONSTRAINT album_style_name_fkey;
       public          postgres    false    4677    221    217            X           2606    24814    album album_type_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_type_name_fkey FOREIGN KEY (type_name) REFERENCES public.type(type_name);
 D   ALTER TABLE ONLY public.album DROP CONSTRAINT album_type_name_fkey;
       public          postgres    false    221    220    4683            \           2606    24850 '   performed_by performed_by_album_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);
 Q   ALTER TABLE ONLY public.performed_by DROP CONSTRAINT performed_by_album_id_fkey;
       public          postgres    false    4685    224    221            ]           2606    24855 *   performed_by performed_by_artist_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.performed_by
    ADD CONSTRAINT performed_by_artist_name_fkey FOREIGN KEY (artist_name) REFERENCES public.person(artist_name);
 T   ALTER TABLE ONLY public.performed_by DROP CONSTRAINT performed_by_artist_name_fkey;
       public          postgres    false    215    224    4673            Z           2606    24835 %   produced_by produced_by_album_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);
 O   ALTER TABLE ONLY public.produced_by DROP CONSTRAINT produced_by_album_id_fkey;
       public          postgres    false    4685    223    221            [           2606    24840 (   produced_by produced_by_artist_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produced_by
    ADD CONSTRAINT produced_by_artist_name_fkey FOREIGN KEY (artist_name) REFERENCES public.person(artist_name);
 R   ALTER TABLE ONLY public.produced_by DROP CONSTRAINT produced_by_artist_name_fkey;
       public          postgres    false    223    215    4673            Y           2606    24825    song song_album_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id);
 A   ALTER TABLE ONLY public.song DROP CONSTRAINT song_album_id_fkey;
       public          postgres    false    222    221    4685            �   �  x���Mn�0���S�*]%��֎��O�QkX�W���T"Lq�����&�XF�]�@��~ ~��ͣ"Hq������I�Icj<D�0�2�L���i�1�Lضr�0SM �g�m�ə ��5�?�k�P��V��nںê"\�}��ON�/=�N�~3w�#Q^r��ٯ�jQ�Û5�E\R�^_�8��
�q%�I��h<8m��nḭヵ6.�����k�-z���+�wy�Hjw�_��H<�̕�SR��ܥn��ƚ.�v}X^�លYXy��+-]B����L�P}jpa���%9�:��R<;S��s�iϬߙ�H,�^q�|�Ae�e%Q�Zr�6&o��΋�����R=�ݓ��{9g�B�6�����W���X�ɉFr+s�O�a�I�ڲBq��ml�Yj��+\�����u�3��Ņ�z�;Ȥ��-`�K"�P��-���J����wȡZ̉��q?���z�E̕���L��4��s菛^��
�.{+      �   @   x���,IMQ.I,I-V�OSp�M-�LN�
�Hxg楧��r���&�Ur�%�%�r��qqq ��	      �   ;   x������M��
�O����K�LUp�ρ1��AjN\�9��%E�y��\�.�Y�=... ú      �   �   x�m�1n�@E�S�	��@ e��`Y�P�ٰ{%3��k"��Mr�X�ݾ׼W��7�Hn<�}9��"˧Fx�6hE���OT����l�s�[�7��x���/���r{2?��<�&xo�K���R��TyE����I�AC����"���%t���q�xF��!Ce�Ё����DLb      �   
  x�5�Kn�@@מS���j+
*iٰ1'3b�+g��}�	kRɋ�lK�Tl��GL�C52L��=�L��l�
�_����S<[kz�rW�Za,v�`{�5M���{ܓM02<ؕzU\��`�"��FW*�0�Z	Fr۠|d,,�����ÿO+��/	.��	
={x�k�c�f�?1��9�J�rZW�E
�1�ۨe|%�T`dx��rfÂ.����l�P2ߡ6�$!O��e6�
�X�K�仹���.����9�?<9�� ��'      �   �   x�m�;�@D��)|D�S� � �į��X�D,��l"�7�bDԴo4o4��SSzL��	�ܡ`<qh8�Q<[nZ�o�����
�w[mg5��ʫ5X�_}EO̂�Fn�qIV����8�aJu�&0q���
��	y��O��\8�W\�|I�?N��[�ud���å _�jL      �   x   x�E�1�0Ew��'�PXP+�����+D�X�C�>Lt|�{�y߾I���Cmu�`?��Y-859�5���B�fHq-qSbu��Pw0%���8�M�������/�.�Vl�σ�Nxi3      �   �	  x�uW�v�8]�_�ٌ��IrDRϥ$K�'����hz�l qDj���|�|ì�ˏͽE�3��E�# ,Tսu�0UOں�?+�Լ	�&WS�$J�t%�?�Zu����J�\ՅQ��v�?��4J�^G׍�u�V>8��41ʢ4��:���5�ԋb`��KG#�/��h�R׺4Q%���T�֩e��e=}j�����`��iY�g�!��U�u����a����&x�Q�O��0��5\��R�=��Ƹ�'���̨�}���b�&Q�&݇jV��AM�ޔ����Pk�P��M�'�����?��\���*�FN�x�K�q�-�L�1V�nW�:D9����9ri�Lg������.+$7K�Q?^��z\gwg��I�zX_6�]"�i����9Z �A2��K띯k���15�z,~�ei�J�<sc|�[M��Ha</LY��1�n|S�4��.1Υ��*�iժ��0K��V�'�˓9[�_���A�J[�&0�~o�e��L ��P��тwVR���n'G��drs<1A�/p�su�� j/���=�
�Z�7�j}��	JΑ� p�������;�1?��R��K�;@����#e<0�p)�^�?���qy hU��.|E��}}*��"���`qdG�;�3b��
�!��T�e�+�������k�j�Q��C]��`��;���NA��D��X�ti��+��2Z[5�����{V+��֯z�?N�.;��	�?� 2�d��Mak���E3��+��,�pf^ H/�F	㸇��=p��I�@P�0�O�	��p�@
|����"�dwɣL�>��6�Zm��l<��59�t�Ϭ�4�e[�}1@R�meI>�v��T�/A���^��,�^$OKD�PM�5�91Ν��p�
��Md/�iح�����Me�
�}��׺��Y��M���(�W�g�7�����O�1��ohf�w�Q����|���W����x�R�������A
�Ix(+
Z�i�����&N��;tP�<*�]��P����-6N��mwv_�=�i�D<8��������8�93�F<2�V�ljS��Q��� gҏ&���3SZ�*	Yi/�!��?@��l]D��K�eO�*�S-��+JU�Kj��"B�� $΃._k �޼��1���A��|�S�{t���h�k�t	6�l�����$%�
���i��%M�s��5J�LM3��35�\ (���BC�5
���[[W����by�w5:�F���W�-P�{fȆQ"�X�Aݪ{�) �oʍ^>H/g���;�jȐdȝ�����;�+$z�=N�?f"?��#�g�X��'$Ev���-$���K���1�Ib?6p�[v����l��j֒.Ɉ�μFU:�®FWM��񩤭n��N���|��:�{8���:���XB��'��I|=��+]�A1��eEr������=ܥn��JB/'o���0�-�$񗄺�P$dLx�	�T�3�7�����o�O�[�|��V�r�ϗZ�<��3bS�����C)zK7z������r��r�w�u1|�=i���� �Q�8r��~v�yhٖ��y���Q8�v��_�A�4?�5���H)�f�'���o&��A5�KHz�#J�Y����D��Iڥ�#��+{sk&#9�w�����r5I��������%h+#,�&��'@�P�LDoE�ޜ�'�0���xr8����dk}�@�9C!�Q��Ӫ4��1��SF�ɛw�\���K���e{����6ZfU��S��{�k�;�[���|GՅ�"��1�tORq�
#E"lF���g���8�6����Z`���o<k�-�l����1��K�E����o��ew���h�7.�6\7���	�^��5����4n���s��K:��n��ܳ�I�|��W�^#��o��Ŋ��%Ȁ<����_�C��:�J:_O&�)>2�u���2��� �9���Oo/ʀ��K�C�7V�vғ���`�|T���F���0�J*�eg�iV�\�Q������W�K4�g�\
���k ���M
>����
�o���rwӓ9���I.��, ��4t��'��%��or���렑is�Eh�����m�9��B@;���?�6�Nq%�kK�Z�M��ڇ���M�)�hbI*�ה��p�>ѐx`����ڟ�=���0������f����T|�WM<S��=f����r��r	����B
{�/�)c��>�s�Q��7Ƨ�����t��ˏ��жvE�!����Ȕ)
�B�0,9�C!�+R��f�z��<��O�<�	d*/����ֻ��/������W�jH�!M]�SAR��/tYc���:҉���s&��|�&��/�\;Nr����S]��+���P�J4�ƪ/�,��������8���i�}      �   c   x������M�Qp�M�L�+�r�(H-��2��A���\P���l��Ĕ���T.�����\N�E9�y�����9\�.�\��y%��0C�b���� �'�      �      x�.)M��Wp�I*��r������ N�     