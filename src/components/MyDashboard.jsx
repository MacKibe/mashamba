import DocumentsList from "./DocumentsList";
import TranscriptionsSection from "./TranscriptionsSection";
import ImagesSection from "./ImagesSection";
import FilterSection from "./FilterSection";
import { useState } from "react";

function MyDashboard() {
  const documents = [
    {
      pk: 1,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img253.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img255.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img256.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "fgfgfgfgfgfg/1",
        area: "4.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "EMAN MOHAMOOD MOHAMED ",
      },
      name_of_document: "fgfgfgfgfgfg",
    },
    {
      pk: 2,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img185.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img186.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img187.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img188.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "wqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqw/1",
        area: "24.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA EMAN MOHAMED ",
      },
      name_of_document: "wqqwqwqwqwqwqwqwqwqwqwqw",
    },
    {
      pk: 3,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img194.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img195.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img196.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img197.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "yuyuyuyuyuyuyuyu/1",
        area: "25",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA MOOD MOHAMED EMAN",
      },
      name_of_document: "yuyuyuyuyuyuyuyu",
    },
    {
      pk: 4,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img210.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img211.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img212.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img213.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "frfrrfrfrffrfrfrfrrf/1",
        area: "54.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHAMMED EMAN",
      },
      name_of_document: "frfrrfrfrffrfrfrfrrf",
    },
    {
      pk: 5,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img253.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img255.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img256.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "kiikkiikikik/1",
        area: "4.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "EMAN MOHAMOOD MOHAMED ",
      },
      name_of_document: "kiikkiikikik",
    },
    {
      pk: 6,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img185.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img186.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img187.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img188.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "wqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqw/1",
        area: "24.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA EMAN MOHAMED ",
      },
      name_of_document: "wqqwqwqwqwqwqwqwqwqwqwqw",
    },
    {
      pk: 7,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img194.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img195.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img196.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img197.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "yuyuyuyuyuyuyuyu/1",
        area: "25",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA MOOD MOHAMED EMAN",
      },
      name_of_document: "yuyuyuyuyuyuyuyu",
    },
    {
      pk: 8,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img210.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img211.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img212.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img213.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "frfrrfrfrffrfrfrfrrf/1",
        area: "54.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHAMMED EMAN",
      },
      name_of_document: "frfrrfrfrffrfrfrfrrf",
    },
    {
      pk: 9,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img253.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img255.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img256.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "opopopopop/1",
        area: "4.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "EMAN MOHAMOOD MOHAMED ",
      },
      name_of_document: "opopopopop",
    },
    {
      pk: 10,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img185.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img186.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img187.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img188.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "wqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqw/1",
        area: "24.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA EMAN MOHAMED ",
      },
      name_of_document: "wqqwqwqwqwqwqwqwqwqwqwqw",
    },
    {
      pk: 11,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img194.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img195.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img196.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img197.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "yuyuyuyuyuyuyuyu/1",
        area: "25",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA MOOD MOHAMED EMAN",
      },
      name_of_document: "yuyuyuyuyuyuyuyu",
    },
    {
      pk: 12,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img210.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img211.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img212.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img213.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "frfrrfrfrffrfrfrfrrf/1",
        area: "54.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHAMMED EMAN",
      },
      name_of_document: "frfrrfrfrffrfrfrfrrf",
    },
    {
      pk: 13,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img253.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img255.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img256.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "vnvnvnvnvn/1",
        area: "4.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "EMAN MOHAMOOD MOHAMED ",
      },
      name_of_document: "vnvnvnvnvn",
    },
    {
      pk: 14,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img185.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img186.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img187.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img188.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "wqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqw/1",
        area: "24.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA EMAN MOHAMED ",
      },
      name_of_document: "wqqwqwqwqwqwqwqwqwqwqwqw",
    },
    {
      pk: 15,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img194.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img195.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img196.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img197.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "yuyuyuyuyuyuyuyu/1",
        area: "25",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA MOOD MOHAMED EMAN",
      },
      name_of_document: "yuyuyuyuyuyuyuyu",
    },
    {
      pk: 16,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img210.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img211.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img212.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img213.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "frfrrfrfrffrfrfrfrrf/1",
        area: "54.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHAMMED EMAN",
      },
      name_of_document: "frfrrfrfrffrfrfrfrrf",
    },
    {
      pk: 17,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img253.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img255.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img256.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "qeqeqqeqe/1",
        area: "4.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "EMAN MOHAMOOD MOHAMED ",
      },
      name_of_document: "qeqeqqeqe",
    },
    {
      pk: 18,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img185.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img186.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img187.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/11/img188.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "wqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqwwqqwqwqwqwqwqwqwqwqwqwqw/1",
        area: "24.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA EMAN MOHAMED ",
      },
      name_of_document: "wqqwqwqwqwqwqwqwqwqwqwqw",
    },
    {
      pk: 19,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img194.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img195.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img196.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/15/img197.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "yuyuyuyuyuyuyuyu/1",
        area: "25",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHA MOOD MOHAMED EMAN",
      },
      name_of_document: "yuyuyuyuyuyuyuyu",
    },
    {
      pk: 20,
      images: [
        {
          num: "1",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img210.jpg",
          name: "img253.jpg",
        },
        {
          num: "2",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img211.jpg",
          name: "img254.jpg",
        },
        {
          num: "3",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img212.jpg",
          name: "img255.jpg",
        },
        {
          num: "4",
          url: "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/19/img213.jpg",
          name: "img256.jpg",
        },
      ],
      transcription: {
        id: "frfrrfrfrffrfrfrfrrf/1",
        area: "54.2",
        regno: "162/2 161/3 161/4 172/3 173/1",
        person: "MOHAMMED EMAN",
      },
      name_of_document: "frfrrfrfrffrfrfrfrrf",
    },
  ];

  const [selected_document_index, set_new_selected_document_index] = useState(0);

  const handle_click_document = (index) => {
    set_new_selected_document_index(index);
  };
  return (
    <>
      <div className="body--section">
        <div className="side-panel">
          {/* <FilterSection /> */}
          <div className="documents--section">
            <h2>Documents</h2>
            {documents.map((document, index) => (
              <DocumentsList
                key={index}
                document={document}
                index={index}
                onClick={handle_click_document}
              />
            ))}
          </div>
        </div>
        <div className="main--section">
          <div className="main--image_section">
            {selected_document_index !== null && (
              <ImagesSection
                images={documents[selected_document_index].images}
                index={selected_document_index}
              />
            )}
          </div>
          <div className="main--transcription_section">
            {selected_document_index !== null && (
              <TranscriptionsSection
                transcriptions={
                  documents[selected_document_index].transcription
                }
                index={selected_document_index}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDashboard;
