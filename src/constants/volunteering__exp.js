// Volunteering experience constants
const volunteeringData = [
  {
    organisation: "College LAH",
    role: "UK Applications Mentor",
    image: "https://media.licdn.com/dms/image/v2/C560BAQEHKXXQA-0U-w/company-logo_100_100/company-logo_100_100/0/1630650592744/collegelah_logo?e=1755734400&v=beta&t=-bTDZjqadCoQtx_bf4VeBc6V3v0QFh6N0NEsHLnSbe8",
    date: "Oct 2023 - Jan 2024",
    media: null,
    country: "Malaysia",
    description: null
  },
  {
    organisation: "Global Lounge",
    role: "Language Cafe Volunteer",
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEI-FX7LYgURA/company-logo_100_100/company-logo_100_100/0/1709028257234/university_of_bristol_business_school_logo?e=1755734400&v=beta&t=IfN1IrE_AI27C0GLwKDON06JhQz_RcS0sineomT4MJY",
    date: "Feb 2024 - Aug 2024",
    media: null,
    country: "UK",
    description: null
  },
  {
    organisation: "IGCSE Tutor",
    role: "Students Hub - Schools Plus",
    image: "https://media.licdn.com/dms/image/v2/C4D0BAQHdIgMIZPbPsQ/company-logo_100_100/company-logo_100_100/0/1644417332993/schoolsplus_logo?e=1755734400&v=beta&t=WmF6dbu_3vGjfHUuoTGVdWU7m3NMVVTDuggeRccJufE",
    date: "Sep 2023 - Dec 2023",
    media: null,
    country: "UK",
    description: null
  },
  {
    organisation: "College LAH",
    role: "Student Hubs - Invent Plus",
    image: "https://media.licdn.com/dms/image/v2/C4D0BAQEUOBRzl2Hu3A/company-logo_100_100/company-logo_100_100/0/1630523312410/student_hubs_logo?e=1755734400&v=beta&t=WiRffIWSWN4Y_4ze3HilfPxrUCT3Tr8HNaM8dv0FPEk",
    date: "Feb 2022 - Apr 2023",
    media: null,
    country: "UK",
    description: null
  },
  {
    organisation: "University of Bath Thai Society",
    role: "Volunteer",
    image: "https://media.licdn.com/dms/image/v2/C560BAQGk6Pq8scv1_Q/company-logo_100_100/company-logo_100_100/0/1659675333742?e=1755734400&v=beta&t=PkKJauFI4rmBDjUR7QcPpFRpiCRqlFiTY5C1RyZY4cs",
    date: "Sep 2022 - Sep 2022",
    media: null,
    country: "Thailand",
    description: "Khao Mao BathxBristol Education Programme"
  },
  {
    organisation: "Harrow International School Bangkok",
    role: "Ride for Rainbows",
    image: null,
    date: "Apr 2018 - Apr 2021",
    media: null,
    country: "Thailand",
    description: "5 years of Ride for rainbow"
  },
  {
    organisation: "Harrow International School Bangkok",
    role: "Harrow Ocean Warriors",
    image: "https://media.licdn.com/dms/image/v2/C560BAQEQmIKUjpmdsw/company-logo_100_100/company-logo_100_100/0/1677140941045/harrowbangkok_logo?e=1755734400&v=beta&t=kZCXn0Do2iFAcjX_z-YD6JhDcR748q_f5TKMZNQFJ0o",
    date: "Apr 2020- May 2020",
    media: null,
    country: "Singapore",
    description: "Beach Clean up, Various Locations"
  },
  {
    organisation: "Harrow International School Bangkok",
    role: "Harrow Lionheart Committee",
    image: "https://media.licdn.com/dms/image/v2/C560BAQEQmIKUjpmdsw/company-logo_100_100/company-logo_100_100/0/1677140941045/harrowbangkok_logo?e=1755734400&v=beta&t=kZCXn0Do2iFAcjX_z-YD6JhDcR748q_f5TKMZNQFJ0o",
    date: "Jan 2019 - Apr 2020",
    media: null,
    country: "Myanmar",
    description: null
  },
  {
    organisation: "Harrow International School Bangkok",
    role: "Ride for Rainbows",
    image: "https://media.licdn.com/dms/image/v2/C560BAQEQmIKUjpmdsw/company-logo_100_100/company-logo_100_100/0/1677140941045/harrowbangkok_logo?e=1755734400&v=beta&t=kZCXn0Do2iFAcjX_z-YD6JhDcR748q_f5TKMZNQFJ0o",
    date: "Apr 2018 - Apr 2021",
    media: null,
    country: "Thailand",
    description: "5 years of Ride for rainbow"
  }
];

const countryCentroids = {
  UK: { coordinates: [-1.5, 52.5] },
  Malaysia: { coordinates: [101.9758, 4.2105] },
  Thailand: { coordinates: [100.5, 15.8] },
  Singapore: { coordinates: [103.8198, 1.3521] },
  Myanmar: { coordinates: [96.1, 21.9] },
};

export default volunteeringData;

export const titleDescription = "Roles directly supporting a social or environmental cause, either as part of an organisation or contribution to short-term voluntary services.";

