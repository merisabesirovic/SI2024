import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselPage.css";
import amiraginhan from "../../assets/carousel_images/amiragin-han-final2.png";
import arap from "../../assets/carousel_images/Arap-dzamija-final.png";
import bedem from "../../assets/carousel_images/bedem-final.png";
import crkva_sv_Nikole from "../../assets/carousel_images/crkva-sv-Nikole.png";
import djurdjevi from "../../assets/carousel_images/djurdjevi-2.png";
import hamam from "../../assets/carousel_images/hamam-final.png";
import mitropolija from "../../assets/carousel_images/mitropolija.png";
import petrova_crkva from "../../assets/carousel_images/petrova-crkva-final.png";
import sopocani from "../../assets/carousel_images/sopocani-final.png";

import CarouselCard from "../../components/CarouselCard/CarouselCard";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5, // Number of items shown on super large desktops
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3, // Number of items shown on desktops
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2, // Number of items shown on tablets
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // Number of items shown on mobile
  },
};

const CarouselPage = () => {
  return (
    <div className="carousel-page-wrapper">
      <h1 className="title">Poznati spomenici</h1>
      <Carousel responsive={responsive}>
        <CarouselCard
          title="Amiragin han"
          subtitle="Svedok vremena"
          description="Amir-agin han je smešten u centru Novog Pazara. O vremenu njegove gradnje nema podataka, ali se pretpostavlja da potiče iz 17. veka. Po svojoj arhitektonskoj koncepciji odstupa od klasičnih građevina ove namene. Kod ovog hana se jasno izdvajaju dve glavne grupe prostorija. Prvi deo, koji se sastojao iz prizemlja i sprata, služio je za smeštaj i prenoćište putnika. U njega se ulazilo neposredno sa ulice, kroz jedan dobro očuvan ulaz, čija su vrata okovana gvožđem."
          image={amiraginhan}
          path="path"
        />
        <CarouselCard
          title="Arap džamija"
          subtitle="Stara čaršija"
          description="Arap ili Hasan Čelebi džamija nalazi se na ulazu u staru novopazarsku čaršiju. Malo je pouzdanih podataka o istorijatu ove džamije i njenom ktitoru. Poznato je da se ova džamija pominje u popisu iz 1528. godine što svedoči o tome da se radi o veoma starom kulturno-istorijskom spomeniku u Novom Pazaru."
          image={arap}
          path="path"
        />
        <CarouselCard
          title="Bedem"
          subtitle="Novopazarska tvrđava"
          description="Utvrđenje sačinjavaju tri ugaona bastiona – tabije, formirajući približno jednakokraki trougao čije strane imaju dužinu od oko 200 m. Pored pomenutih tabija, na bedemima tvrđave nalazi se i kula poznata kao Stara izvidnica, ili Kula motrilja, smeštena na približnoj polovini razdaljine između severne i zapadne tabije.Ovaj spomenik kulture je predstavljen u grub grada Novog Pazara."
          image={bedem}
          path="path"
        />
        <CarouselCard
          title="Crkva Svetog Nikole"
          subtitle="Romantičarski istorizam"
          description="Crkva je građena od 1871. godine. Poznati su podaci koji govore o graditeljima iz Makedonije, Debranima, koji su bili angažovani na izgradnji crkve. Arhitektonski koncept pripada arhitekturi romantičarskog istorizma,"
          image={crkva_sv_Nikole}
          path="path"
        />
        <CarouselCard
          title="Đurđevi stupovi"
          subtitle="Zadužbina Stefana Nemanje"
          description="Manastir Đurđevi stupovi, još jedan od bisera srpske srednjovekovne države na Listi Svetske baštine UNESCO-a, izgrađen je na brdu iznad današnjeg Novog Pazara, u tzv. Starom Rasu. Pripada najstarijim srpskim manastirima. Ovaj, po mnogo čemu poseban hram, podigao je Stefan Nemanja u prvim godinama posle stupanja na presto velikog župana (izgradnja je završena 1171. godine), a crkva je oslikana oko 1175. godine."
          image={djurdjevi}
          path="path"
        />
        <CarouselCard
          title="Isa begov Hamam"
          subtitle="Tursko kupatilo"
          description="sa begov hamam je smešten u Staroj čaršiji. Sa severne strane je omeđen Arap džamijom, a sa zapadne trgovačkim radnjama. Ktitor ovog hamama bio je osnivač Novog Pazara, Isa-beg Ishaković, početkom druge polovine XV veka. Prvi put se u pisanim tekstovima pominje 1489. godine."
          image={hamam}
          path="path"
        />
        <CarouselCard
          title="Zgrada Mitropolije"
          subtitle="Spomenik kulture"
          description="Mitropolija u Varoš mahali spada u najstarije primerke narodnog graditeljstva u Novom Pazaru, ali i Srbiji. Izgrađena je u drugoj polovini XVIII veka, a veruje se da je u njoj bila smeštena rezidencija raško-prizrenskih mitropolita. Od 1885. do 1903. u njoj je bila smeštena i prva ženska škola, a potom i mešovita škola."
          image={mitropolija}
          path="path"
        />
        <CarouselCard
          title="Crkva sv. apostola Petra i Pavla"
          subtitle="Petrova crkva"
          description="Iznad desne obale Deževske reke, nedaleko od njenog ušća u Rašku, u severoistočnom delu Novog Pazara, smeštena je crkva Svetih apostola Petra i Pavla u narodu poznatija kao Petrova crkva"
          image={petrova_crkva}
          path="path"
        />
        <CarouselCard
          title="Manastir Sopoćani"
          subtitle="Zadužbina Uroša I"
          description="Na zapadnom obodu doline reke Raške, pored samog izvora reke, među visokim i nerodnim brdima, s pretećim kamenim liticama, kralj Uroš I (1243-1276) je, po ugledu na slavne pretke, podigao sebi grobnu crkvu posvećenu Svetoj Trojici. Naziv “Sopoćani” manastir je dobio po staroslovenskoj reči “sopot”, što znači izvor."
          image={sopocani}
          path="path"
        />
      </Carousel>
    </div>
  );
};

export default CarouselPage;
