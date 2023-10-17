"use client";

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import PaymentContext from "@/context/PaymentContext";
import AuthContext from "@/context/AuthContext";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import moment from "moment";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import Header from "./header";
import Footer from "./footer";

function Checkout({ access_token }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isMesafeliSozlesmeOpen, setIsMesafeliSozlesmeOpen] = useState(false);
  const [isonBilgilendirmeFormuOpen, setIsonBilgilendirmeFormuOpen] =
    useState(false);

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [error, setError] = useState("");

  const { userBasket, item, makePayment } = useContext(PaymentContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  if (!userBasket) {
    return (
      <main>
        <Header />
        <h1 className="h-screen container mx-auto text-lg font-medium mt-8 text-center">
          Lütfen tekrar deneyin.
        </h1>
        <Footer />
      </main>
    );
  }

  if (!user) {
    router.push("/");
  }

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
  }, [user]);

  useEffect(() => {
    if (phoneNumber && isPossiblePhoneNumber(phoneNumber) === false) {
      setPhoneNumberError("Lütfen geçerli bir telefon numarası giriniz.");
    }
  }, [phoneNumber]);

  const checkForm = () => {
    if (!phoneNumber || !address) {
      setError("Lütfen formu doldurun.");
      return false;
    }

    if (!isChecked) {
      setError("Lütfen sözleşmeleri onaylayın.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  const { title, date, instructor, price, image, type, productID } = item;

  const handlePayment = async () => {
    const check = checkForm();

    if (!check) return;

    const response = await fetch("https://api.ipify.org/?format=json");
    const { ip } = await response.json();

    const formData = new FormData();

    formData.append("name", `${firstName} ${lastName}`);
    formData.append("phone_number", phoneNumber);
    formData.append("address", address);
    formData.append("user", user);

    formData.append("ip", ip);
    formData.append("title", title);
    formData.append("price", price * 100);
    formData.append("product_type", type);
    formData.append("userBasket", userBasket);
    formData.append("product_id", productID);

    const data = await makePayment(formData, access_token);

    if (data.success) router.push(`/payment?token=${data.token}`);
    else toast.error(data.message);
  };

  // const dummyConfirm = async () => {
  //   const formData = new FormData();

  //   formData.append("name", `${firstName} ${lastName}`);
  //   formData.append("phone_number", phoneNumber);
  //   formData.append("address", address);
  //   formData.append("user", user);

  //   formData.append("title", title);
  //   formData.append("price", price * 100);
  //   formData.append("product_type", type);
  //   formData.append("userBasket", userBasket);
  //   formData.append("product_id", productID);

  //   const first_response = await fetch(
  //     `${process.env.API_URL}/api/v1/payment/dummy_first/`,
  //     {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     }
  //   );

  //   const oid = await first_response.json(); //response.ok mi olsa?
  //   console.log(oid);

  //   const data = {
  //     status: "success",
  //     merchant_oid: oid,
  //   };

  //   if (oid) {
  //     const last_response = await fetch(
  //       `${process.env.API_URL}/api/v1/payment/dummy/`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const last_data = await last_response.json();
  //     console.log(last_data);
  //   }
  // };

  const handleMesafeli = () => {
    setIsFormModalOpen(true);
    setIsMesafeliSozlesmeOpen(true);
  };

  const handleOnBilgilendirme = () => {
    setIsFormModalOpen(true);
    setIsonBilgilendirmeFormuOpen(true);
  };

  const handleModalClose = () => {
    setIsFormModalOpen(false);
    setIsMesafeliSozlesmeOpen(false);
    setIsonBilgilendirmeFormuOpen(false);
  };

  return (
    <>
      <main className="min-h-screen ">
        <section className="flex flex-col justify-center items-center mt-12 space-y-2 md:h-[44rem]  md:items-start md:space-x-2 md:space-y-0 md:flex-row">
          <form
            method="post"
            className="w-full flex flex-col select-none h-full py-16 px-12 bg-[#F9FEFF] rounded-lg max-w-sm md:max-w-md lg:max-w-3xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
          >
            <div className="text-xl font-bold">Ödeme bilgileri</div>
            <div className="py-12 flex flex-col space-y-6">
              <div className="relative space-y-4">
                <label className="font-medium" htmlFor="name">
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={firstName}
                  className="w-full h-10 p-3 placeholder-transparent cursor-not-allowed text-black bg-fottoWhite border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm"
                  placeholder="isim" //bak
                  autoComplete="off"
                  disabled
                />
              </div>
              <div className="relative space-y-4">
                <label className="font-medium" htmlFor="lastname">
                  Soyisim
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={lastName}
                  className="w-full h-10 p-3 placeholder-transparent cursor-not-allowed text-black bg-fottoWhite border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm"
                  placeholder="soyisim" //bak
                  autoComplete="off"
                  disabled
                />
              </div>
              <div className="relative space-y-4">
                <label className="font-medium" htmlFor="phonenumber">
                  Telefon
                </label>
                <PhoneInput
                  limitMaxLength="true"
                  defaultCountry="TR"
                  name="phonenumber"
                  id="phonenumber"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  smartCaret="true"
                  className="w-full h-10 p-3 placeholder-transparent text-black bg-white border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm"
                />
              </div>
              <div className="relative space-y-4">
                <label className="font-medium" htmlFor="address">
                  Adres
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-10 p-3 placeholder-transparent text-black bg-white border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm"
                  placeholder="adres" //bak
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
          <div className="flex flex-col space-y-2 h-full">
            <div className="flex flex-col h-fit p-4 bg-[#F9FEFF] rounded-lg max-w-sm items-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10">
              <Image
                src={`${process.env.API_URL}${image}`}
                width={100}
                height={100}
                sizes="100vw"
                alt="image"
                className="w-fit rounded-xl"
              ></Image>

              <h1 className="mt-4 font-bold text-xl min-h-[5rem] wrapword">
                {title}
              </h1>
              <h2 className="mt-2 font-medium">{instructor}</h2>
              <h2 className="mt-2 font-medium">
                {date && moment(date).format("MM/DD/YYYY HH:mm")}
              </h2>
              <h3 className="mt-2 font-bold text-fottoOrange">{price} TL</h3>
            </div>
            <div className="flex flex-col h-full p-6 bg-[#F9FEFF] rounded-lg max-w-sm shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10">
              <div className="flex justify-between font-bold">
                <h1>Toplam</h1>
                <h1>{price} TL</h1>
              </div>
              <div className="my-6 flex mx-2 space-x-3">
                <input
                  type="checkbox"
                  name="forms"
                  id="forms"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className=""
                />
                <label htmlFor="forms" className="text-sm">
                  {" "}
                  <span
                    onClick={handleOnBilgilendirme}
                    className="text-fottoOrange font-medium hover:text-fottoOrange/80 hover:cursor-pointer"
                  >
                    Ön bilgilendirme formunu
                  </span>{" "}
                  ve{" "}
                  <span
                    onClick={handleMesafeli}
                    className="text-fottoOrange font-medium hover:text-fottoOrange/80 hover:cursor-pointer"
                  >
                    Mesafeli satış sözleşmesini
                  </span>{" "}
                  onaylıyorum
                </label>
              </div>
              <button
                onClick={handlePayment}
                className="px-8 py-2 flex self-center w-fit font-medium text-center text-white bg-darkerOrange rounded-md hover:bg-darkerOrange/90"
              >
                Ödemeye geç
              </button>
            </div>
          </div>
        </section>
      </main>
      <div
        className={`fixed w-full h-full left-0 top-0 justify-center items-center bg-fottoText backdrop-blur-sm bg-opacity-70 z-40 ${
          isFormModalOpen ? "flex" : "hidden"
        }`}
      >
        <div
          onClick={handleModalClose}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div
          className={`flex flex-col bg-white z-50 w-full h-full md:w-1/2 md:h-1/2 overflow-auto relative`}
        >
          <div className="sticky flex items-end justify-end top-0 w-full bg-fottoWhite">
            <button
              onClick={handleModalClose}
              className="flex items-center fill-white mt-1 mr-4 p-1"
            >
              <IoMdClose className="w-8 h-8 fill-secBlue" />
            </button>
          </div>
          <div className="flex mx-4 my-2">
            {isMesafeliSozlesmeOpen && (
              <div>
                <h1 className="font-bold text-lg">MESAFELİ SATIŞ SÖZLEŞMESİ</h1>

                <h2 className="font-bold mt-4">1.TARAFLAR</h2>
                <p>
                  İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen
                  hüküm ve şartlar çerçevesinde imzalanmıştır.
                </p>

                <p>
                  ‘ALICI’ ; (sözleşmede bundan sonra "ALICI" olarak anılacaktır)
                </p>
                <p>
                  AD- SOYAD: {firstName + " " + lastName}
                  <br />
                  ADRES: {address}
                </p>

                <p>
                  ‘SATICI’ ; (sözleşmede bundan sonra "SATICI" olarak
                  anılacaktır)
                </p>
                <p>
                  AD- SOYAD: Aycan Korkmaz
                  <br />
                  ADRES: Akasya Mah. Sinem Sk. No:7/5 Antakya/Hatay
                </p>

                <p>
                  İş bu sözleşmeyi kabul etmekle ALICI, sözleşme konusu siparişi
                  onayladığı takdirde sipariş konusu bedeli ve varsa kargo
                  ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü
                  altına gireceğini ve bu konuda bilgilendirildiğini peşinen
                  kabul eder.
                </p>

                <h2 className="font-bold mt-4">2.TANIMLAR</h2>
                <p>
                  İşbu sözleşmenin uygulanmasında ve yorumlanmasında aşağıda
                  yazılı terimler karşılarındaki yazılı açıklamaları ifade
                  edeceklerdir.
                </p>

                <p>
                  BAKAN : Gümrük ve Ticaret Bakanı’nı,
                  <br />
                  BAKANLIK : Gümrük ve Ticaret Bakanlığı’nı,
                  <br />
                  KANUN : 6502 sayılı Tüketicinin Korunması Hakkında Kanun’u,
                  <br />
                  YÖNETMELİK : Mesafeli Sözleşmeler Yönetmeliği’ni
                  (RG:27.11.2014/29188)
                  <br />
                  HİZMET : Bir ücret veya menfaat karşılığında yapılan ya da
                  yapılması taahhüt edilen mal sağlama dışındaki her türlü
                  tüketici işleminin konusunu,
                  <br />
                  SATICI : Ticari veya mesleki faaliyetleri kapsamında
                  tüketiciye mal sunan veya mal sunan adına veya hesabına
                  hareket eden şirketi,
                  <br />
                  ALICI : Bir mal veya hizmeti ticari veya mesleki olmayan
                  amaçlarla edinen, kullanan veya yararlanan gerçek ya da tüzel
                  kişiyi,
                  <br />
                  SİTE : SATICI’ya ait internet sitesini,
                  <br />
                  SİPARİŞ VEREN: Bir mal veya hizmeti SATICI’ya ait internet
                  sitesi üzerinden talep eden gerçek ya da tüzel kişiyi,
                  <br />
                  TARAFLAR : SATICI ve ALICI’yı,
                  <br />
                  SÖZLEŞME : SATICI ve ALICI arasında akdedilen işbu sözleşmeyi,
                  <br />
                  MAL : Alışverişe konu olan taşınır eşyayı ve elektronik
                  ortamda kullanılmak üzere hazırlanan yazılım, ses, görüntü ve
                  benzeri gayri maddi malları ifade eder.
                </p>

                <h2 className="font-bold mt-4">3.KONU</h2>
                <p>
                  İşbu Sözleşme, ALICI’nın, SATICI’ya ait internet sitesi
                  üzerinden elektronik ortamda siparişini verdiği aşağıda
                  nitelikleri ve satış fiyatı belirtilen ürünün satışı ve
                  teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması
                  Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik
                  hükümleri gereğince tarafların hak ve yükümlülüklerini
                  düzenler.
                </p>

                <p>
                  Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır.
                  İlan edilen fiyatlar ve vaatler güncelleme yapılana ve
                  değiştirilene kadar geçerlidir. Süreli olarak ilan edilen
                  fiyatlar ise belirtilen süre sonuna kadar geçerlidir.
                </p>

                <h2 className="font-bold mt-4">4. SATICI BİLGİLERİ</h2>
                <p>
                  Ünvanı: Aycan Korkmaz
                  <br />
                  Adres: Akasya Mah. Sinem Sk. No:7/5 Antakya/Hatay
                  <br />
                  Telefon: 0551 984 82 00
                  <br />
                  Eposta: destek@fizyottolive.com
                </p>

                <h2 className="font-bold mt-4">5. ALICI BİLGİLERİ</h2>
                <p>
                  Teslim edilecek kişi: {firstName + " " + lastName}
                  <br />
                  Teslimat Adresi: {address}
                  <br />
                  Telefon: {phoneNumber}
                  <br />
                  Eposta: {user.email}
                </p>
                <h2 className="font-bold mt-4">
                  6. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ
                </h2>
                <p>
                  Malın /Ürün/Ürünlerin/ Hizmetin temel özelliklerini (türü,
                  miktarı, marka/modeli, rengi, adedi) SATICI’ya ait internet
                  sitesinde yayınlanmaktadır. Satıcı tarafından kampanya
                  düzenlenmiş ise ilgili ürünün temel özelliklerini kampanya
                  süresince inceleyebilirsiniz. Kampanya tarihine kadar
                  geçerlidir.
                </p>
                <p>
                  6.2. Listelenen ve sitede ilan edilen fiyatlar satış
                  fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme yapılana
                  ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen
                  fiyatlar ise belirtilen süre sonuna kadar geçerlidir.
                </p>
                <p>
                  6.3. Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil
                  satış fiyatı aşağıda gösterilmiştir.
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Ürün Açıklaması</th>
                      <th>Adet</th>
                      <th>Birim Fiyatı</th>
                      <th>Ara Toplam (KDV Dahil)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{title}</td>
                      <td>1</td>
                      <td>{price} TL</td>
                      <td>{price} TL</td>
                    </tr>
                  </tbody>
                </table>

                <p>Kargo Tutarı: 0 TL</p>
                <p>Toplam: {price} TL</p>
                <p className="mt-2 font-medium">Ödeme Şekli ve Planı</p>
                <p>Teslimat Adresi: {address}</p>
                <p>Teslim Edilecek kişi: {firstName + " " + lastName}</p>
                <p>Fatura Adresi: {firstName + " " + lastName}</p>
                <p>Sipariş Tarihi: {moment().format("DD/MM/YYYY")}</p>

                <p>
                  6.4. Ürün sevkiyat masrafı olan kargo ücreti ALICI tarafından
                  ödenecektir.
                </p>

                <h2 className="font-bold mt-4">7. FATURA BİLGİLERİ</h2>
                <p>Ad/Soyad/Unvan:{firstName + " " + lastName}</p>
                <p>Adres: {address}</p>
                <p>Telefon:{phoneNumber}</p>
                <p>Eposta: {user.email}</p>
                <p>
                  Fatura teslim: Fatura sipariş teslimatı sırasında fatura
                  adresine sipariş ile birlikte teslim edilecektir.
                </p>
                <h2 className="font-bold mt-4">8. GENEL HÜKÜMLER</h2>
                <p>
                  8.1. ALICI, SATICI’ya ait internet sitesinde sözleşme konusu
                  ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile
                  teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu,
                  elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve
                  taahhüt eder. ALICI’nın; Ön Bilgilendirmeyi elektronik ortamda
                  teyit etmesi, mesafeli satış sözleşmesinin kurulmasından
                  evvel, SATICI tarafından ALICI' ya verilmesi gereken adresi,
                  siparişi verilen ürünlere ait temel özellikleri, ürünlerin
                  vergiler dâhil fiyatını, ödeme ve teslimat bilgilerini de
                  doğru ve eksiksiz olarak edindiğini kabul, beyan ve taahhüt
                  eder.
                </p>
                <p>
                  8.2. Sözleşme konusu her bir ürün, 30 günlük yasal süreyi
                  aşmamak kaydı ile ALICI' nın yerleşim yeri uzaklığına bağlı
                  olarak internet sitesindeki ön bilgiler kısmında belirtilen
                  süre zarfında ALICI veya ALICI’nın gösterdiği adresteki kişi
                  ve/veya kuruluşa teslim edilir. Bu süre içinde ürünün ALICI’ya
                  teslim edilememesi durumunda, ALICI’nın sözleşmeyi feshetme
                  hakkı saklıdır.
                </p>
                <p>
                  8.3. SATICI, Sözleşme konusu ürünü eksiksiz, siparişte
                  belirtilen niteliklere uygun ve varsa garanti belgeleri,
                  kullanım kılavuzları işin gereği olan bilgi ve belgeler ile
                  teslim etmeyi, her türlü ayıptan arî olarak yasal mevzuat
                  gereklerine göre sağlam, standartlara uygun bir şekilde işi
                  doğruluk ve dürüstlük esasları dâhilinde ifa etmeyi, hizmet
                  kalitesini koruyup yükseltmeyi, işin ifası sırasında gerekli
                  dikkat ve özeni göstermeyi, ihtiyat ve öngörü ile hareket
                  etmeyi kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  8.4. SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi
                  dolmadan ALICI’yı bilgilendirmek ve açıkça onayını almak
                  suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik
                  edebilir.
                </p>
                <p>
                  8.5. SATICI, sipariş konusu ürün veya hizmetin yerine
                  getirilmesinin imkânsızlaşması halinde sözleşme konusu
                  yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği
                  tarihten itibaren 3 gün içinde yazılı olarak tüketiciye
                  bildireceğini, 14 günlük süre içinde toplam bedeli ALICI’ya
                  iade edeceğini kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  8.6. ALICI, Sözleşme konusu ürünün teslimatı için işbu
                  Sözleşme’yi elektronik ortamda teyit edeceğini, herhangi bir
                  nedenle sözleşme konusu ürün bedelinin ödenmemesi ve/veya
                  banka kayıtlarında iptal edilmesi halinde, SATICI’nın sözleşme
                  konusu ürünü teslim yükümlülüğünün sona ereceğini kabul, beyan
                  ve taahhüt eder.
                </p>
                <p>
                  8.7. ALICI, Sözleşme konusu ürünün ALICI veya ALICI’nın
                  gösterdiği adresteki kişi ve/veya kuruluşa tesliminden sonra
                  ALICI'ya ait kredi kartının yetkisiz kişilerce haksız
                  kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili
                  banka veya finans kuruluşu tarafından SATICI'ya ödenmemesi
                  halinde, ALICI Sözleşme konusu ürünü 3 gün içerisinde nakliye
                  gideri SATICI’ya ait olacak şekilde SATICI’ya iade edeceğini
                  kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  8.8. SATICI, tarafların iradesi dışında gelişen, önceden
                  öngörülemeyen ve tarafların borçlarını yerine getirmesini
                  engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir
                  sebepler halleri nedeni ile sözleşme konusu ürünü süresi
                  içinde teslim edemez ise, durumu ALICI'ya bildireceğini kabul,
                  beyan ve taahhüt eder. ALICI da siparişin iptal edilmesini,
                  sözleşme konusu ürünün varsa emsali ile değiştirilmesini
                  ve/veya teslimat süresinin engelleyici durumun ortadan
                  kalkmasına kadar ertelenmesini SATICI’dan talep etme hakkını
                  haizdir. ALICI tarafından siparişin iptal edilmesi halinde
                  ALICI’nın nakit ile yaptığı ödemelerde, ürün tutarı 14 gün
                  içinde kendisine nakden ve defaten ödenir. ALICI’nın kredi
                  kartı ile yaptığı ödemelerde ise, ürün tutarı, siparişin ALICI
                  tarafından iptal edilmesinden sonra 14 gün içerisinde ilgili
                  bankaya iade edilir. ALICI, SATICI tarafından kredi kartına
                  iade edilen tutarın banka tarafından ALICI hesabına
                  yansıtılmasına ilişkin ortalama sürecin 2 ile 3 haftayı
                  bulabileceğini, bu tutarın bankaya iadesinden sonra ALICI’nın
                  hesaplarına yansıması halinin tamamen banka işlem süreci ile
                  ilgili olduğundan, ALICI, olası gecikmeler için SATICI’yı
                  sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  8.9. SATICININ, ALICI tarafından siteye kayıt formunda
                  belirtilen veya daha sonra kendisi tarafından güncellenen
                  adresi, e-posta adresi, sabit ve mobil telefon hatları ve
                  diğer iletişim bilgileri üzerinden mektup, e-posta, SMS,
                  telefon görüşmesi ve diğer yollarla iletişim, pazarlama,
                  bildirim ve diğer amaçlarla ALICI’ya ulaşma hakkı
                  bulunmaktadır. ALICI, işbu sözleşmeyi kabul etmekle SATICI’nın
                  kendisine yönelik yukarıda belirtilen iletişim faaliyetlerinde
                  bulunabileceğini kabul ve beyan etmektedir.
                </p>
                <p>
                  8.10. ALICI, sözleşme konusu mal/hizmeti teslim almadan önce
                  muayene edecek; ezik, kırık, ambalajı yırtılmış vb. hasarlı ve
                  ayıplı mal/hizmeti kargo şirketinden teslim almayacaktır.
                  Teslim alınan mal/hizmetin hasarsız ve sağlam olduğu kabul
                  edilecektir. Teslimden sonra mal/hizmetin özenle korunması
                  borcu, ALICI’ya aittir. Cayma hakkı kullanılacaksa mal/hizmet
                  kullanılmamalıdır. Fatura iade edilmelidir.
                </p>
                <p>
                  8.11. ALICI ile sipariş esnasında kullanılan kredi kartı
                  hamilinin aynı kişi olmaması veya ürünün ALICI’ya tesliminden
                  evvel, siparişte kullanılan kredi kartına ilişkin güvenlik
                  açığı tespit edilmesi halinde, SATICI, kredi kartı hamiline
                  ilişkin kimlik ve iletişim bilgilerini, siparişte kullanılan
                  kredi kartının bir önceki aya ait ekstresini yahut kart
                  hamilinin bankasından kredi kartının kendisine ait olduğuna
                  ilişkin yazıyı ibraz etmesini ALICI’dan talep edebilir.
                  ALICI’nın talebe konu bilgi/belgeleri temin etmesine kadar
                  geçecek sürede sipariş dondurulacak olup, mezkur taleplerin 24
                  saat içerisinde karşılanmaması halinde ise SATICI, siparişi
                  iptal etme hakkını haizdir.
                </p>
                <p>
                  8.12. ALICI, SATICI’ya ait internet sitesine üye olurken
                  verdiği kişisel ve diğer sair bilgilerin gerçeğe uygun
                  olduğunu, SATICI’nın bu bilgilerin gerçeğe aykırılığı
                  nedeniyle uğrayacağı tüm zararları, SATICI’nın ilk bildirimi
                  üzerine derhal, nakden ve defaten tazmin edeceğini beyan ve
                  taahhüt eder.
                </p>
                <p>
                  8.13. ALICI, SATICI’ya ait internet sitesini kullanırken yasal
                  mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi
                  baştan kabul ve taahhüt eder. Aksi takdirde, doğacak tüm
                  hukuki ve cezai yükümlülükler tamamen ve münhasıran ALICI’yı
                  bağlayacaktır.
                </p>
                <p>
                  8.14. ALICI, SATICI’ya ait internet sitesini hiçbir şekilde
                  kamu düzenini bozucu, genel ahlaka aykırı, başkalarını
                  rahatsız ve taciz edici şekilde, yasalara aykırı bir amaç
                  için, başkalarının maddi ve manevi haklarına tecavüz edecek
                  şekilde kullanamaz. Ayrıca, üye başkalarının hizmetleri
                  kullanmasını önleyici veya zorlaştırıcı faaliyet (spam, virus,
                  truva atı, vb.) işlemlerde bulunamaz.
                </p>
                <p>
                  8.15. SATICI’ya ait internet sitesinin üzerinden, SATICI’nın
                  kendi kontrolünde olmayan ve/veya başkaca üçüncü kişilerin
                  sahip olduğu ve/veya işlettiği başka web sitelerine ve/veya
                  başka içeriklere link verilebilir. Bu linkler ALICI’ya
                  yönlenme kolaylığı sağlamak amacıyla konmuş olup herhangi bir
                  web sitesini veya o siteyi işleten kişiyi desteklememekte ve
                  Link verilen web sitesinin içerdiği bilgilere yönelik herhangi
                  bir garanti niteliği taşımamaktadır.
                </p>
                <p>
                  8.16. İşbu sözleşme içerisinde sayılan maddelerden bir ya da
                  birkaçını ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki
                  olarak şahsen sorumlu olup, SATICI’yı bu ihlallerin hukuki ve
                  cezai sonuçlarından ari tutacaktır. Ayrıca; işbu ihlal
                  nedeniyle, olayın hukuk alanına intikal ettirilmesi halinde,
                  SATICI’nın üyeye karşı üyelik sözleşmesine uyulmamasından
                  dolayı tazminat talebinde bulunma hakkı saklıdır.
                </p>
                <h2 className="font-bold mt-4">9. CAYMA HAKKI</h2>
                <p>
                  9.1. ALICI; mesafeli sözleşmenin mal satışına ilişkin olması
                  durumunda, ürünün kendisine veya gösterdiği adresteki
                  kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün
                  içerisinde, SATICI’ya bildirmek şartıyla hiçbir hukuki ve
                  cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe
                  göstermeksizin malı reddederek sözleşmeden cayma hakkını
                  kullanabilir. Hizmet sunumuna ilişkin mesafeli sözleşmelerde
                  ise, bu süre sözleşmenin imzalandığı tarihten itibaren başlar.
                  Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile
                  hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı
                  kullanılamaz. Cayma hakkının kullanımından kaynaklanan
                  masraflar SATICI’ ya aittir. ALICI, iş bu sözleşmeyi kabul
                  etmekle, cayma hakkı konusunda bilgilendirildiğini peşinen
                  kabul eder.
                </p>
                <p>
                  9.2. Cayma hakkının kullanılması için 14 (ondört) günlük süre
                  içinde SATICI' ya iadeli taahhütlü posta, faks veya eposta ile
                  yazılı bildirimde bulunulması ve ürünün işbu sözleşmede
                  düzenlenen "Cayma Hakkı Kullanılamayacak Ürünler" hükümleri
                  çerçevesinde kullanılmamış olması şarttır. Bu hakkın
                  kullanılması halinde,
                </p>
                <p>
                  a) 3. kişiye veya ALICI’ ya teslim edilen ürünün faturası,
                  (İade edilmek istenen ürünün faturası kurumsal ise, iade
                  ederken kurumun düzenlemiş olduğu iade faturası ile birlikte
                  gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen
                  sipariş iadeleri İADE FATURASI kesilmediği takdirde
                  tamamlanamayacaktır.)
                </p>
                <p>b) İade formu,</p>
                <p>
                  c) İade edilecek ürünlerin kutusu, ambalajı, varsa standart
                  aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim
                  edilmesi gerekmektedir.
                </p>
                <p>
                  d) SATICI, cayma bildiriminin kendisine ulaşmasından itibaren
                  en geç 10 günlük süre içerisinde toplam bedeli ve ALICI’yı
                  borç altına sokan belgeleri ALICI’ ya iade etmek ve 20 günlük
                  süre içerisinde malı iade almakla yükümlüdür.
                </p>
                <p>
                  e) ALICI’ nın kusurundan kaynaklanan bir nedenle malın
                  değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI
                  kusuru oranında SATICI’ nın zararlarını tazmin etmekle
                  yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün
                  usulüne uygun kullanılması sebebiyle meydana gelen değişiklik
                  ve bozulmalardan ALICI sorumlu değildir.
                </p>
                <p>
                  f) Cayma hakkının kullanılması nedeniyle SATICI tarafından
                  düzenlenen kampanya limit tutarının altına düşülmesi halinde
                  kampanya kapsamında faydalanılan indirim miktarı iptal edilir.
                </p>
                <h2 className="font-bold mt-4">
                  10. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER
                </h2>
                <p>
                  ALICI’nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda
                  hazırlanan ve geri gönderilmeye müsait olmayan, iç giyim alt
                  parçaları, mayo ve bikini altları, makyaj malzemeleri, tek
                  kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son
                  kullanma tarihi geçme ihtimali olan mallar, ALICI’ya teslim
                  edilmesinin ardından ALICI tarafından ambalajı açıldığı
                  takdirde iade edilmesi sağlık ve hijyen açısından uygun
                  olmayan ürünler, teslim edildikten sonra başka ürünlerle
                  karışan ve doğası gereği ayrıştırılması mümkün olmayan
                  ürünler, abonelik sözleşmesi kapsamında sağlananlar dışında,
                  gazete ve dergi gibi süreli yayınlara ilişkin mallar,
                  elektronik ortamda anında ifa edilen hizmetler veya tüketiciye
                  anında teslim edilen gayrimaddi mallar, ses veya görüntü
                  kayıtlarının, kitap, dijital içerik, yazılım programlarının,
                  veri kaydedebilme ve veri depolama cihazlarının, bilgisayar
                  sarf malzemelerinin, ambalajının ALICI tarafından açılmış
                  olması halinde iadesi Yönetmelik gereği mümkün değildir.
                  Ayrıca, Cayma hakkı süresi sona ermeden önce, tüketicinin
                  onayı ile ifasına başlanan hizmetlere ilişkin cayma hakkının
                  kullanılması da Yönetmelik gereği mümkün değildir.
                </p>
                <p>
                  Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo,
                  bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, VCD,
                  CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş,
                  şerit vb.) iade edilebilmesi için ambalajlarının açılmamış,
                  denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.
                </p>
                <h2 className="font-bold mt-4">
                  11. TEMERRÜT HALİ VE HUKUKİ SONUÇLARI
                </h2>
                <p>
                  ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda
                  temerrüde düştüğü takdirde, kart sahibi banka ile arasındaki
                  kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve
                  bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder.
                  Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak
                  masrafları ve vekâlet ücretini ALICI’dan talep edebilir ve her
                  koşulda ALICI’nın borcundan dolayı temerrüde düşmesi halinde,
                  ALICI, borcun gecikmeli ifasından dolayı SATICI’nın uğradığı
                  zarar ve ziyanını ödeyeceğini kabul, beyan ve taahhüt eder.
                </p>
              </div>
            )}
            {isonBilgilendirmeFormuOpen && (
              <div>
                <h1 className="font-bold text-lg">ÖN BİLGİLENDİRME FORMU</h1>
                <h2 className="font-bold mt-4">1. KONU</h2>
                <p>
                  İşbu Satış Sözleşmesi Ön Bilgi Formu’nun konusu, SATICI'nın,
                  SİPARİŞ VEREN/ALICI'ya satışını yaptığı, aşağıda nitelikleri
                  ve satış fiyatı belirtilen ürün/ürünlerin satışı ve teslimi
                  ile ilgili olarak 6502 sayılı Tüketicilerin Korunması
                  Hakkındaki Kanun - Mesafeli Sözleşmeler Yönetmeliği
                  (RG:27.11.2014/29188) hükümleri gereğince tarafların hak ve
                  yükümlülüklerini kapsamaktadır. İş bu ön bilgilendirme formunu
                  kabul etmekle ALICI, sözleşme konusu siparişi onayladığı
                  takdirde sipariş konusu bedeli ve varsa kargo ücreti, vergi
                  gibi belirtilen ek ücretleri ödeme yükümlülüğü altına
                  gireceğini ve bu konuda bilgilendirildiğini peşinen kabul
                  eder.
                </p>
                <h2 className="font-bold mt-4">2. SATICI BİLGİLERİ</h2>
                <p>
                  Ünvanı: Aycan Korkmaz
                  <br />
                  Adres: Akasya Mah. Sinem Sk. No:7/5 Antakya/Hatay
                  <br />
                  Telefon: 0551 984 82 00
                  <br />
                  Eposta: destek@fizyottolive.com
                </p>
                <h2 className="font-bold mt-4">
                  3. ALICI BİLGİLERİ (Bundan sonra ALICI olarak anılacaktır.)
                </h2>
                <p>
                  Teslim edilecek kişi: {firstName + " " + lastName}
                  <br />
                  Teslimat Adresi: {address}
                  <br />
                  Telefon: {phoneNumber}
                  <br />
                  Eposta: {user.email}
                </p>
                <h2 className="font-bold mt-4">
                  4. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ
                </h2>
                <p>
                  4.1 Malın/Ürün/Ürünlerin/Hizmetin temel özellikleri (türü,
                  miktarı, marka/modeli, rengi, adedi) SATICI’ya ait internet
                  sitesinde yer almaktadır. Ürünün temel özelliklerini kampanya
                  süresince inceleyebilirsiniz. Kampanya tarihine kadar
                  geçerlidir.
                </p>
                <p>
                  4.2 Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır.
                  İlan edilen fiyatlar ve vaatler güncelleme yapılana ve
                  değiştirilene kadar geçerlidir. Süreli olarak ilan edilen
                  fiyatlar ise belirtilen süre sonuna kadar geçerlidir.
                </p>
                <p>
                  4.3 Sözleşme konusu mal ya da hizmetin tüm vergiler dahil
                  satış fiyatı aşağıdaki tabloda gösterilmiştir.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Ürün Açıklaması</th>
                      <th>Adet</th>
                      <th>Birim Fiyatı</th>
                      <th>Ara Toplam (KDV Dahil)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{title}</td>
                      <td>1</td>
                      <td>{price} TL</td>
                      <td>{price} TL</td>
                    </tr>
                  </tbody>
                </table>

                <p>Kargo Tutarı: 0 TL</p>
                <p>Toplam: {price} TL</p>

                <p className="mt-2 font-medium">Ödeme Şekli ve Planı</p>
                <p>Teslimat Adresi: {address}</p>
                <p>Teslim Edilecek kişi: {firstName + " " + lastName}</p>
                <p>Fatura Adresi: {firstName + " " + lastName}</p>
                <p>Sipariş Tarihi: {moment().format("DD/MM/YYYY")}</p>

                <h2 className="font-bold mt-4">5. GENEL HÜKÜMLER</h2>
                <p>
                  5.1. ALICI, SATICI’ya ait internet sitesinde sözleşme konusu
                  ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile
                  teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu,
                  elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve
                  taahhüt eder. ALICININ; Ön Bilgilendirmeyi elektronik ortamda
                  teyit etmesi, mesafeli satış sözleşmesinin kurulmasından
                  evvel, SATICI tarafından ALICI' ya verilmesi gereken adresi,
                  siparişi verilen ürünlere ait temel özellikleri, ürünlerin
                  vergiler dâhil fiyatını, ödeme ve teslimat bilgilerini de
                  doğru ve eksiksiz olarak edindiğini kabul, beyan ve taahhüt
                  eder.
                </p>
                <p>
                  5.2. Sözleşme konusu her bir ürün, 30 günlük yasal süreyi
                  aşmamak kaydı ile ALICI'nın yerleşim yeri uzaklığına bağlı
                  olarak internet sitesindeki ön bilgiler kısmında belirtilen
                  süre zarfında ALICI veya ALICI’nın gösterdiği adresteki kişi
                  ve/veya kuruluşa teslim edilir. Bu süre içinde ürünün ALICI’ya
                  teslim edilememesi durumunda, ALICI’nın sözleşmeyi feshetme
                  hakkı saklıdır.
                </p>
                <p>
                  5.3. SATICI, sözleşme konusu ürünü eksiksiz, siparişte
                  belirtilen niteliklere uygun ve varsa garanti belgeleri,
                  kullanım kılavuzları ile teslim etmeyi, her türlü ayıptan ari
                  olarak yasal mevzuat gereklerine sağlam, standartlara uygun
                  bir şekilde işin gereği olan bilgi ve belgeler ile işi
                  doğruluk ve dürüstlük esasları dahilinde ifa etmeyi, hizmet
                  kalitesini koruyup yükseltmeyi, işin ifası sırasında gerekli
                  dikkat ve özeni göstermeyi, ihtiyat ve öngörü ile hareket
                  etmeyi kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  5.4. SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi
                  dolmadan ALICI’yı bilgilendirmek ve açıkça onayını almak
                  suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik
                  edebilir.
                </p>
                <p>
                  5.5. SATICI, sipariş konusu ürün veya hizmetin yerine
                  getirilmesinin imkânsızlaşması halinde sözleşme konusu
                  yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği
                  tarihten itibaren 3 gün içinde yazılı olarak tüketiciye
                  bildireceğini, 14 günlük süre içinde toplam bedeli ALICI’ya
                  iade edeceğini kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  5.6. ALICI, sözleşme konusu ürünün teslimatı için işbu Ön
                  Bilgilendirme Formunu elektronik ortamda teyit edeceğini,
                  herhangi bir nedenle sözleşme konusu ürün bedelinin ödenmemesi
                  ve/veya banka kayıtlarında iptal edilmesi halinde, SATICI’nın
                  sözleşme konusu ürünü teslim yükümlülüğünün sona ereceğini
                  kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  5.7. ALICI, Sözleşme konusu ürünün ALICI veya ALICI’nın
                  gösterdiği adresteki kişi ve/veya kuruluşa tesliminden sonra
                  ALICI'ya ait kredi kartının yetkisiz kişilerce haksız
                  kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili
                  banka veya finans kuruluşu tarafından SATICI'ya ödenmemesi
                  halinde, ALICI Sözleşme konusu ürünü 3 gün içerisinde nakliye
                  gideri SATICI’ya ait olacak şekilde SATICI’ya iade edeceğini
                  kabul, beyan ve taahhüt eder.
                </p>
                <p>
                  5.8. SATICI, tarafların iradesi dışında gelişen, önceden
                  öngörülemeyen ve tarafların borçlarını yerine getirmesini
                  engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir
                  sebepler nedeni ile sözleşme konusu ürünü süresi içinde teslim
                  edemez ise, durumu ALICI'ya bildireceğini kabul, beyan ve
                  taahhüt eder. ALICI da siparişin iptal edilmesini, sözleşme
                  konusu ürünün varsa emsali ile değiştirilmesini ve/veya
                  teslimat süresinin engelleyici durumun ortadan kalkmasına
                  kadar ertelenmesini SATICI’dan talep etme hakkına haizdir.
                  ALICI tarafından siparişin iptal edilmesi halinde ALICI’ nın
                  nakit ile yaptığı ödemelerde, ürün tutarı 14 gün içinde
                  kendisine nakden ve defaten ödenir. ALICI’ nın kredi kartı ile
                  yaptığı ödemelerde ise, ürün tutarı, siparişin ALICI
                  tarafından iptal edilmesinden sonra 14 gün içerisinde ilgili
                  bankaya iade edilir. ALICI, SATICI tarafından kredi kartına
                  iade edilen tutarın banka tarafından ALICI hesabına
                  yansıtılmasına ilişkin ortalama sürecin 2 ile 3 haftayı
                  bulabileceğini, bu tutarın bankaya iadesinden sonra ALICI’ nın
                  hesaplarına yansıması halinin tamamen banka işlem süreci ile
                  ilgili olduğundan, ALICI, olası gecikmeler için SATICI’yı
                  sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
                </p>
                <h2 className="font-bold mt-4">6. FATURA BİLGİLERİ</h2>
                <p>
                  Ad/Soyad/Unvan: {firstName + " " + lastName}
                  <br />
                  Adres: {address}
                  <br />
                  Telefon: {phoneNumber}
                  <br />
                  Eposta: {user.email}
                  <br />
                  Fatura teslim: Fatura sipariş teslimatı sırasında fatura
                  adresine sipariş ile birlikte teslim edilecektir.
                </p>
                <h2 className="font-bold mt-4">7. CAYMA HAKKI</h2>
                <p>
                  7.1. ALICI; mal satışına ilişkin mesafeli sözleşmelerde,
                  ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa
                  teslim tarihinden itibaren 14 (on dört) gün içerisinde,
                  SATICI’ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk
                  üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı
                  reddederek sözleşmeden cayma hakkını kullanabilir. Hizmet
                  sunumuna ilişkin mesafeli sözleşmelerde ise, bu süre
                  sözleşmenin imzalandığı tarihten itibaren başlar. Cayma hakkı
                  süresi sona ermeden önce, tüketicinin onayı ile hizmetin
                  ifasına başlanan hizmet sözleşmelerinde cayma hakkı
                  kullanılamaz. Cayma hakkının kullanımından kaynaklanan
                  masraflar SATICI’ya aittir. ALICI, iş bu sözleşmeyi kabul
                  etmekle, cayma hakkı konusunda bilgilendirildiğini peşinen
                  kabul eder.
                </p>
                <p>
                  7.2. Cayma hakkının kullanılması için 14 (ondört) günlük süre
                  içinde SATICI' ya iadeli taahhütlü posta, faks veya eposta ile
                  yazılı bildirimde bulunulması ve ürünün işbu sözleşmede
                  düzenlenen düzenlenen "Cayma Hakkı Kullanılamayacak Ürünler"
                  hükümleri çerçevesinde kullanılmamış olması şarttır. Bu hakkın
                  kullanılması halinde,
                </p>
                <p>
                  7.2.1. 3. kişiye veya ALICI’ ya teslim edilen ürünün faturası,
                  (İade edilmek istenen ürünün faturası kurumsal ise, geri iade
                  ederken kurumun düzenlemiş olduğu iade faturası ile birlikte
                  gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen
                  sipariş iadeleri İADE FATURASI kesilmediği takdirde
                  tamamlanamayacaktır.)
                </p>
                <p>7.2.2. İade formu,</p>
                <p>
                  7.2.3. İade edilecek ürünlerin kutusu, ambalajı, varsa
                  standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak
                  teslim edilmesi gerekmektedir.
                </p>
                <p>
                  7.2.4. SATICI, cayma bildiriminin kendisine ulaşmasından
                  itibaren en geç 10 günlük süre içerisinde toplam bedeli ve
                  ALICI’ yı borç altına sokan belgeleri ALICI’ ya iade etmek ve
                  20 günlük süre içerisinde malı iade almakla yükümlüdür.
                </p>
                <p>
                  7.2.5. ALICI’ nın kusurundan kaynaklanan bir nedenle malın
                  değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI
                  kusuru oranında SATICI’ nın zararlarını tazmin etmekle
                  yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün
                  usulüne uygun kullanılmasın sebebiyle meydana gelen değişiklik
                  ve bozulmalardan ALICI sorumlu değildir.
                </p>
                <p>
                  7.2.6. Cayma hakkının kullanılması nedeniyle SATICI tarafından
                  düzenlenen kampanya limit tutarının altına düşülmesi halinde
                  kampanya kapsamında faydalanılan indirim miktarı iptal edilir.
                </p>
                <h2 className="font-bold mt-4">
                  8. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER
                </h2>
                <p>
                  8.1. a) Fiyatı finansal piyasalardaki dalgalanmalara bağlı
                  olarak değişen ve satıcı veya sağlayıcının kontrolünde olmayan
                  mal veya hizmetlere ilişkin sözleşmeler.
                </p>
                <p>
                  b) Tüketicinin istekleri veya kişisel ihtiyaçları
                  doğrultusunda hazırlanan mallara ilişkin sözleşmeler.
                </p>
                <p>
                  c) Çabuk bozulabilen veya son kullanma tarihi geçebilecek
                  malların teslimine ilişkin sözleşmeler.
                </p>
                <p>
                  ç) Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
                  unsurları açılmış olan mallardan; iadesi sağlık ve hijyen
                  açısından uygun olmayanların teslimine ilişkin sözleşmeler.
                </p>
                <p>
                  d) Tesliminden sonra başka ürünlerle karışan ve doğası gereği
                  ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.
                </p>
                <p>
                  e) Malın tesliminden sonra ambalaj, bant, mühür, paket gibi
                  koruyucu unsurları açılmış olması halinde maddi ortamda
                  sunulan kitap, dijital içerik ve bilgisayar sarf
                  malzemelerine, veri kaydedebilme ve veri depolama cihazlarına
                  ilişkin sözleşmeler.
                </p>
                <p>
                  f) Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete
                  ve dergi gibi süreli yayınların teslimine ilişkin sözleşmeler.
                </p>
                <p>
                  g) Belirli bir tarihte veya dönemde yapılması gereken,
                  konaklama, eşya taşıma, araba kiralama, yiyecek-içecek
                  tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın
                  değerlendirilmesine ilişkin sözleşmeler.
                </p>
                <p>
                  ğ) Elektronik ortamda anında ifa edilen hizmetler veya
                  tüketiciye anında teslim edilen gayrimaddi mallara ilişkin
                  sözleşmeler.
                </p>
                <p>
                  h) Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile
                  ifasına başlanan hizmetlere ilişkin sözleşmeler.
                </p>
                <p>
                  Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo,
                  bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, VCD,
                  CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş,
                  şerit vb.) iade edilebilmesi için ambalajlarının açılmamış,
                  denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.
                </p>
                <p>
                  8.2. SATICI şikâyet ve itirazları konusunda başvurularını,
                  aşağıdaki kanunda belirtilen parasal sınırlar dâhilinde
                  tüketicinin yerleşim yerinin bulunduğu veya tüketici işleminin
                  yapıldığı yerdeki tüketici sorunları hakem heyetine veya
                  tüketici mahkemesine yapabilir. Parasal sınıra ilişkin
                  bilgiler aşağıdadır:
                </p>
                <p>
                  28/05/2014 tarihinden itibaren geçerli olmak üzere:
                  <br />
                  a) 6502 sayılı Tüketicinin Korunması Hakkında Kanun’un 68.
                  Maddesi gereği değeri 2.000,00 (ikibin) TL’nin altında olan
                  uyuşmazlıklarda ilçe tüketici hakem heyetlerine,
                  <br />
                  b) Değeri 3.000,00(üçbin)TL’ nin altında bulunan
                  uyuşmazlıklarda il tüketici hakem heyetlerine,
                  <br />
                  c) Büyükşehir statüsünde bulunan illerde ise değeri 2.000,00
                  (ikibin) TL ile 3.000,00(üçbin)TL’ arasındaki uyuşmazlıklarda
                  il tüketici hakem heyetlerine başvuru yapılmaktadır.
                </p>
                <p>İşbu Sözleşme ticari amaçlarla yapılmaktadır.</p>
                <p>
                  SATICI: Aycan Korkmaz
                  <br />
                  ALICI: {firstName + " " + lastName}
                  <br />
                  TARİH: {moment().format("DD/MM/YYYY")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
