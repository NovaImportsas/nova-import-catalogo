import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, ChevronLeft, ChevronDown, Heart, Star, Plus, Minus, Trash2, Truck, Lock, Sparkles, MessageCircle, Filter, Award, Globe, Check, CheckCircle2, Package, MapPin, Mail, Phone, Instagram, Facebook, ExternalLink, Clock, Shield, Tag, ArrowUpRight, Info, AlertCircle } from 'lucide-react';

// ============================================================
// FONTS + GLOBAL STYLES
// ============================================================
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,1,400&display=swap');
    .f-archivo { font-family: 'Archivo', sans-serif; }
    .f-dm { font-family: 'DM Sans', sans-serif; }
    .f-fraunces { font-family: 'Fraunces', serif; }
    .f-mono { font-family: 'Archivo', sans-serif; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; font-weight: 600; }
    @keyframes scroll-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee { animation: scroll-x 35s linear infinite; }
    @keyframes fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .fade { animation: fadein 0.5s ease-out; }
    .grain { background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px); background-size: 3px 3px; }
  `}</style>
);

// ============================================================
// BRAND COLORS
// ============================================================
const C = {
  navy: '#1B3A6F',
  navyDark: '#0F2547',
  orange: '#F58220',
  orangeDark: '#D96812',
  cream: '#FAFAF7',
  warm: '#F4F1EB',
  ink: '#1A1A1A',
  muted: '#6B7280',
};

// ============================================================
// LOGO ADAPTADO
// ============================================================
const Logo = ({ variant = 'header' }) => {
  if (variant === 'mark') {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.navy }}>
        <span className="f-archivo font-black text-white text-lg">N</span>
        <span className="f-archivo font-black text-lg ml-[1px]" style={{ color: C.orange }}>i</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.navy }}>
        <Globe size={18} className="text-white" strokeWidth={2.5} />
      </div>
      <div className="leading-none">
        <div className="f-archivo font-black text-xl tracking-tight leading-none">
          <span style={{ color: C.navy }}>Nova</span>
          <span style={{ color: C.orange }}> Import</span>
        </div>
        <div className="f-archivo text-[9px] tracking-[0.25em] mt-0.5" style={{ color: C.muted }}>PERFUMERÍA</div>
      </div>
    </div>
  );
};

// ============================================================
// PRODUCT DATA
// ============================================================
const PRODUCTS = [
  // ============================================================
  // LÍNEA ÁRABE ORIGINAL (productos auténticos, nombre real)
  // ============================================================
  {
    id: 'khamrah',
    name: 'Khamrah',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Dulce',
    gender: 'Unisex',
    notes: 'Canela · Dátil · Vainilla · Tonka · Mirra · Praliné',
    description: 'Una celebración árabe en frasco. Khamrah de Lattafa es un oriental dulce y especiado que recuerda el ambiente de una boda en el desierto. Apertura cálida con dátiles confitados y canela, corazón de vainilla cremosa, fondo de tonka, praliné y mirra. Buena proyección, durabilidad de 8+ horas.',
    color: { primary: '#3D1A0F', accent: '#8B4513', shadow: 'rgba(139,69,19,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 165000, stock: 12 }],
    imageUrl: '', // ← Pegar URL de la foto Lattafa Khamrah (clásica, frasco transparente con líquido ámbar)
    featured: true,
    bestseller: true,
  },
  {
    id: 'khamrah-qahwa',
    name: 'Khamrah Qahwa',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Café',
    gender: 'Unisex',
    notes: 'Café · Cardamomo · Cacao · Vainilla · Praliné · Sándalo',
    description: 'La versión café del icónico Khamrah. Cardamomo verde y café espresso recién molido sobre una base de cacao amargo y vainilla bourbon. Para quienes aman el aroma del café pero en clave de perfume.',
    color: { primary: '#2A1810', accent: '#6B3D1F', shadow: 'rgba(107,61,31,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 170000, stock: 8 }],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'khamrah-dukhan',
    name: 'Khamrah Dukhan',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Ahumado',
    gender: 'Unisex',
    notes: 'Ámbar · Resinas · Incienso · Vainilla · Maderas · Almizcle',
    description: 'La cara más ahumada de la familia Khamrah. Ámbar resinoso con un velo de incienso y maderas oscuras. Para quienes buscan un oriental con carácter contemplativo.',
    color: { primary: '#2D1812', accent: '#7A3D24', shadow: 'rgba(122,61,36,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 175000, stock: 7 }],
    imageUrl: '',
  },
  {
    id: 'bade-al-oud-sublime',
    name: "Bade'e Al Oud Sublime",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oud Frutal',
    gender: 'Unisex',
    notes: 'Frambuesa negra · Oud · Azafrán · Pachulí · Ámbar · Almizcle',
    description: 'El oud encuentra a la frambuesa negra. Apertura jugosa y oscura, corazón de oud noble y azafrán, fondo de ámbar y pachulí. Para portar en ocasiones especiales — proyecta hasta el otro lado de la sala.',
    color: { primary: '#3D0E1F', accent: '#7A1E3E', shadow: 'rgba(122,30,62,0.35)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 180000, stock: 5 }],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'bade-al-oud-glory',
    name: "Bade'e Al Oud · Oud For Glory",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oud Oriental',
    gender: 'Unisex',
    notes: 'Saffron · Rosa · Oud · Cuero · Ámbar · Pachulí',
    description: 'El oud árabe en su versión más imponente. Apertura especiada con azafrán, corazón de rosa y oud envejecido, fondo de cuero y ámbar. Frasco negro con detalles dorados, presentación premium.',
    color: { primary: '#1A1209', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 178000, stock: 6 }],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'asad',
    name: 'Asad',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Cuero',
    gender: 'Hombre',
    notes: 'Manzana negra · Cuero · Tabaco · Sándalo · Ámbar · Almizcle',
    description: 'Manzana negra confitada sobre un cuero curtido. Lattafa Asad es el perfume árabe de cuero por excelencia, con una potencia que recuerda a fragancias de diseñador del doble del precio.',
    color: { primary: '#2A1108', accent: '#5C2D17', shadow: 'rgba(92,45,23,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 145000, stock: 10 }],
    imageUrl: '',
  },
  {
    id: 'asad-bourbon',
    name: 'Asad Bourbon',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Gourmand Amaderado',
    gender: 'Hombre',
    notes: 'Bourbon · Vainilla · Tabaco · Cacao · Maderas · Cuero',
    description: 'La versión gourmand del Asad clásico. Bourbon, vainilla y tabaco sobre un fondo amaderado y de cuero suave. Más dulce y nocturno que el Asad original.',
    color: { primary: '#2D1B0E', accent: '#6B3F1F', shadow: 'rgba(107,63,31,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 150000, stock: 9 }],
    imageUrl: '',
  },
  {
    id: 'club-nuit-intense',
    name: 'Club de Nuit Intense Man',
    brand: 'Armaf',
    type: 'arabe',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Piña · Manzana negra · Pimienta · Abedul · Pachulí · Ámbar gris',
    description: 'La opción árabe más conocida del segmento. Frescura cítrica seguida de un corazón especiado y un fondo amaderado denso. Versátil — funciona en oficina, cena y noche.',
    color: { primary: '#1A1E14', accent: '#3D4A2B', shadow: 'rgba(61,74,43,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 150000, stock: 18 }],
    imageUrl: '',
    bestseller: true,
  },
  {
    id: '9pm',
    name: '9PM',
    brand: 'Afnan',
    type: 'arabe',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Manzana · Lavanda · Canela · Cuero · Vainilla · Sándalo',
    description: 'Apertura de manzana especiada con un fondo de vainilla y sándalo cremoso. Una opción dulce-masculina con presencia segura sin volverse abrumadora.',
    color: { primary: '#1A1A1A', accent: '#3D2914', shadow: 'rgba(61,41,20,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 140000, stock: 15 }],
    imageUrl: '',
  },
  {
    id: 'bharara-king',
    name: 'Bharara King',
    brand: 'Bharara',
    type: 'arabe',
    family: 'Aromático Especiado',
    gender: 'Hombre',
    notes: 'Cardamomo · Pimienta · Cuero · Ámbar · Vetiver · Almizcle',
    description: 'Un aromático especiado con presencia. Frescura inicial con cardamomo y pimienta, fondo de cuero y ámbar. Frasco transparente con tapa cobre, diseño elegante.',
    color: { primary: '#0D1F2D', accent: '#5C3E1F', shadow: 'rgba(92,62,31,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 155000, stock: 9 }],
    imageUrl: '',
  },
  {
    id: 'bharara-bleu',
    name: 'Bharara Bleu',
    brand: 'Bharara',
    type: 'arabe',
    family: 'Acuático Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Sal marina · Lavanda · Pachulí · Cedro · Ámbar gris',
    description: 'La interpretación de Bharara del acorde acuático masculino. Frescura salina con un fondo amaderado limpio. Frasco azul cobalto con etiqueta dorada.',
    color: { primary: '#0A2540', accent: '#2A5A8A', shadow: 'rgba(42,90,138,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 155000, stock: 11 }],
    imageUrl: '',
  },
  {
    id: 'amber-rouge',
    name: 'Amber Rouge',
    brand: 'Orientica',
    type: 'arabe',
    family: 'Oriental Ámbar',
    gender: 'Unisex',
    notes: 'Azafrán · Rosa · Ámbar · Oud · Pachulí · Vainilla',
    description: 'El ámbar oriental en su versión más ornamental. Rosa y azafrán abren paso a un fondo denso de ámbar y oud. Frasco con detalles tipo joyería rosé gold.',
    color: { primary: '#4A0E1A', accent: '#A8475C', shadow: 'rgba(168,71,92,0.35)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 175000, stock: 7 }],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'art-of-universe',
    name: 'Art of Universe',
    brand: 'Lattafa Pride',
    type: 'arabe',
    family: 'Aromático Amaderado',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Lavanda · Geranio · Cedro · Almizcle',
    description: 'Fragancia masculina fresca con notas aromáticas y un fondo amaderado limpio. Presentación premium en frasco azul con grabado de planetas.',
    color: { primary: '#0F1F4A', accent: '#3D5A8A', shadow: 'rgba(61,90,138,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 170000, stock: 8 }],
    imageUrl: '',
  },
  {
    id: 'emeer',
    name: 'Emeer',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Cardamomo · Saffron · Cuero · Ámbar · Oud · Maderas',
    description: 'Composición oriental masculina con notas especiadas y un fondo ámbar-cuero. Frasco dorado calado, presentación distintiva.',
    color: { primary: '#3D2A0F', accent: '#A8852B', shadow: 'rgba(168,133,43,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 165000, stock: 10 }],
    imageUrl: '',
  },
  {
    id: 'his-confession',
    name: 'His Confession',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Cardamomo · Pimienta · Cuero · Tabaco · Sándalo · Maderas',
    description: 'Oriental masculino con carácter clásico. Notas especiadas sobre un fondo de cuero y tabaco rubio. Presentación con busto escultórico negro y dorado.',
    color: { primary: '#1A0F0A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 175000, stock: 6 }],
    imageUrl: '',
  },
  {
    id: 'yara',
    name: 'Yara',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Orquídea · Frutas tropicales · Tonka · Vainilla · Almizcle',
    description: 'El perfume árabe femenino más viral del año. Dulce, cremoso, adictivo. Tonka y vainilla sobre un acorde frutal floral. La fragancia más comentada en TikTok.',
    color: { primary: '#3D1A2A', accent: '#7A3852', shadow: 'rgba(122,56,82,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 160000, stock: 22 }],
    imageUrl: '',
    featured: true,
    bestseller: true,
  },
  {
    id: 'yara-candy',
    name: 'Yara Candy',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Gourmand Frutal',
    gender: 'Mujer',
    notes: 'Frambuesa · Caramelo · Praliné · Tonka · Vainilla',
    description: 'La evolución gourmand del icónico Yara. Más dulce, más jugoso, con un acorde de caramelo y frambuesa que se siente como postre líquido.',
    color: { primary: '#4A1E2A', accent: '#A8475C', shadow: 'rgba(168,71,92,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 160000, stock: 14 }],
    imageUrl: '',
  },
  {
    id: 'odyssey-mandarin',
    name: 'Odyssey Mandarin Sky',
    brand: 'Armaf',
    type: 'arabe',
    family: 'Cítrico Frutal',
    gender: 'Unisex',
    notes: 'Mandarina · Bergamota · Jengibre · Pimienta rosa · Cedro · Almizcle',
    description: 'Cítrico fresco con un acorde de mandarina jugosa y un fondo limpio amaderado. Edición limitada con funda en cuero turquesa, presentación de colección.',
    color: { primary: '#0F4A6B', accent: '#F58220', shadow: 'rgba(245,130,32,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 165000, stock: 8 }],
    imageUrl: '',
  },
  {
    id: 'amber-oud-rouge',
    name: 'Amber Oud Rouge',
    brand: 'Al Haramain',
    type: 'arabe',
    family: 'Oud Oriental',
    gender: 'Unisex',
    notes: 'Rosa · Oud · Ámbar · Sándalo · Pachulí · Almizcle',
    description: 'Oud árabe clásico con un corazón de rosa búlgara y un fondo de ámbar resinoso. Una de las opciones más reconocidas de Al Haramain para entrar al mundo del oud.',
    color: { primary: '#4A1818', accent: '#A8525C', shadow: 'rgba(168,82,92,0.3)' },
    variants: [{ size: '100ml', tier: 'AAA', price: 165000, stock: 9 }],
    imageUrl: '',
  },
  
  // ============================================================
  // LÍNEA ÁMBAR PERFUMERÍA — ESENCIAS INSPIRADAS
  // Productos NO afiliados con las casas referenciadas.
  // Las marcas mencionadas son propiedad de sus respectivos titulares
  // y se citan únicamente como referencia descriptiva del perfil olfativo.
  // ============================================================
  {
    id: 'insp-badboy',
    name: 'Esencia inspirada en Bad Boy',
    inspiredBy: 'Carolina Herrera Bad Boy',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta blanca · Cedro · Cacao · Haba tonka',
    description: 'Esencia inspirada en el perfil aromático frutal masculino tipo Bad Boy de Carolina Herrera. Apertura especiada, corazón aromático, fondo cremoso de cacao y tonka. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1F2D14', accent: '#4A6B2B', shadow: 'rgba(74,107,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 30 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 28 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 22 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 18 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 8 },
    ],
    imageUrl: '/images/products/insp-badboy.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-sauvage',
    name: 'Esencia inspirada en Sauvage',
    inspiredBy: 'Dior Sauvage',
    type: 'inspirado',
    family: 'Aromático Fresco',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta de Sichuán · Ambroxan · Lavanda · Cedro',
    description: 'Esencia inspirada en el perfil fresco aromático masculino tipo Sauvage de Dior. Apertura cítrica, corazón aromático especiado, fondo limpio amaderado con ambroxan. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0D2535', accent: '#2A6B8A', shadow: 'rgba(42,107,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 40 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 35 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 25 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 22 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 10 },
    ],
    imageUrl: '/images/products/insp-sauvage.png',
    bestseller: true,
  },
  {
    id: 'insp-invictus',
    name: 'Esencia inspirada en Invictus',
    inspiredBy: 'Paco Rabanne Invictus',
    type: 'inspirado',
    family: 'Acuático Amaderado',
    gender: 'Hombre',
    notes: 'Pomelo · Mandarina · Hoja de laurel · Ámbar gris · Madera de guayaco',
    description: 'Esencia inspirada en el perfil acuático masculino tipo Invictus de Paco Rabanne. Frescura cítrica con un fondo de ámbar gris. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F2535', accent: '#3D7AA8', shadow: 'rgba(61,122,168,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 25 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 20 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 18 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 15 },
    ],
    imageUrl: '/images/products/insp-invictus.png',
  },
  {
    id: 'insp-invictus-victory',
    name: 'Esencia inspirada en Invictus Victory Elixir',
    inspiredBy: 'Paco Rabanne Invictus Victory Elixir',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Saffron · Lavanda · Pachulí · Ámbar · Mirra · Cumin',
    description: 'Esencia inspirada en la versión más intensa de la línea Invictus. Apertura especiada con azafrán, corazón aromático, fondo oriental denso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F35', accent: '#5C3D6B', shadow: 'rgba(92,61,107,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 22 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 14 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 10 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 6 },
    ],
    imageUrl: '/images/products/insp-invictus-victory.png',
  },
  {
    id: 'insp-212men',
    name: 'Esencia inspirada en 212 Men',
    inspiredBy: 'Carolina Herrera 212 Men',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Bergamota · Petitgrain · Lavanda · Geranio · Almizcle · Sándalo',
    description: 'Esencia inspirada en el perfil urbano clásico tipo 212 Men de Carolina Herrera. Frescura limpia con un fondo elegante de almizcle. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3A3A3A', accent: '#6B7280', shadow: 'rgba(107,114,128,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 15000, stock: 35 },
      { size: '50ml', tier: 'AA', price: 25000, stock: 30 },
      { size: '75ml', tier: 'AA', price: 35000, stock: 22 },
      { size: '100ml', tier: 'AA', price: 70000, stock: 18 },
      { size: '100ml', tier: 'AAA', price: 145000, stock: 12 },
    ],
    imageUrl: '/images/products/insp-212men.png',
  },
  {
    id: 'insp-212vipblack',
    name: 'Esencia inspirada en 212 VIP Black',
    inspiredBy: 'Carolina Herrera 212 VIP Black',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Hombre',
    notes: 'Pimienta · Cuero · Vainilla · Vetiver · Tabaco · Ámbar',
    description: 'Esencia inspirada en el perfil nocturno especiado tipo 212 VIP Black. Apertura con pimienta y cuero, fondo de tabaco y ámbar. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#3D3D3D', shadow: 'rgba(61,61,61,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 25 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 20 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 16 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 8 },
    ],
    imageUrl: '/images/products/insp-212vipblack.png',
    bestseller: true,
  },
  {
    id: 'insp-1million',
    name: 'Esencia inspirada en 1 Million',
    inspiredBy: 'Paco Rabanne 1 Million',
    type: 'inspirado',
    family: 'Especiado Cuero',
    gender: 'Hombre',
    notes: 'Pomelo · Menta · Canela · Rosa · Cuero · Ámbar',
    description: 'Esencia inspirada en el perfil especiado tipo 1 Million de Paco Rabanne. Apertura cítrica refrescante, corazón especiado, fondo cálido de cuero y ámbar. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D2A0A', accent: '#A8852B', shadow: 'rgba(168,133,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 28 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 24 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 18 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 14 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 10 },
    ],
    imageUrl: '/images/products/insp-1million.png',
    bestseller: true,
  },
  {
    id: 'insp-phantom',
    name: 'Esencia inspirada en Phantom',
    inspiredBy: 'Paco Rabanne Phantom',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Lavanda · Limón · Manzana · Vainilla · Pachulí · Madera',
    description: 'Esencia inspirada en el perfil aromático moderno tipo Phantom. Frescura limpia con un fondo gourmand sutil. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D3D3D', accent: '#8A8A8A', shadow: 'rgba(138,138,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 24 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 20 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
    ],
    imageUrl: '/images/products/insp-phantom.png',
  },
  {
    id: 'insp-bleudechanel',
    name: 'Esencia inspirada en Bleu de Chanel',
    inspiredBy: 'Chanel Bleu de Chanel',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Pomelo · Limón · Menta · Jengibre · Sándalo · Cedro · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado aromático tipo Bleu de Chanel. Apertura cítrica fresca, corazón aromático, fondo de maderas elegantes. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F4A', accent: '#1E4A8A', shadow: 'rgba(30,74,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 30 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 25 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 20 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 16 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 10 },
    ],
    imageUrl: '/images/products/insp-bleudechanel.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-lemale',
    name: 'Esencia inspirada en Le Male',
    inspiredBy: 'Jean Paul Gaultier Le Male',
    type: 'inspirado',
    family: 'Aromático Oriental',
    gender: 'Hombre',
    notes: 'Lavanda · Menta · Cardamomo · Canela · Vainilla · Haba tonka',
    description: 'Esencia inspirada en el perfil aromático oriental tipo Le Male de Jean Paul Gaultier. Lavanda fresca sobre un fondo dulce de vainilla y tonka. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F3D5A', accent: '#3D7AA8', shadow: 'rgba(61,122,168,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 26 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 22 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 17 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 14 },
    ],
    imageUrl: '/images/products/insp-lemale.png',
  },
  {
    id: 'insp-scandal',
    name: 'Esencia inspirada en Scandal Le Parfum',
    inspiredBy: 'Jean Paul Gaultier Scandal Le Parfum',
    type: 'inspirado',
    family: 'Oriental Dulce',
    gender: 'Hombre',
    notes: 'Caramelo · Mandarina · Lavanda · Cuero · Sándalo · Almizcle',
    description: 'Esencia inspirada en el perfil oriental dulce tipo Scandal Le Parfum. Apertura jugosa, corazón aromático, fondo de cuero y caramelo. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A0A0A', accent: '#3D1414', shadow: 'rgba(61,20,20,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 17 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 14 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 10 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 6 },
    ],
    imageUrl: '/images/products/insp-scandal.png',
  },
  {
    id: 'insp-ombrenomade',
    name: 'Esencia inspirada en Ombre Nomade',
    inspiredBy: 'Louis Vuitton Ombre Nomade',
    type: 'inspirado',
    family: 'Oud Resinoso',
    gender: 'Unisex',
    notes: 'Frambuesa · Incienso · Oud · Maderas resinosas · Benjuí · Ámbar',
    description: 'Esencia inspirada en el perfil oud nicho tipo Ombre Nomade. Frambuesa oscura sobre incienso resinoso, fondo de oud y benjuí. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A0A0A', accent: '#5C2A1F', shadow: 'rgba(92,42,31,0.35)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 25000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 35000, stock: 14 },
      { size: '75ml', tier: 'AA', price: 45000, stock: 10 },
      { size: '100ml', tier: 'AA', price: 90000, stock: 8 },
      { size: '100ml', tier: 'AAA', price: 180000, stock: 5 },
    ],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'insp-santal33',
    name: 'Esencia inspirada en Santal 33',
    inspiredBy: 'Le Labo Santal 33',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Unisex',
    notes: 'Cardamomo · Violeta · Iris · Sándalo · Cuero · Cedro',
    description: 'Esencia inspirada en el perfil amaderado nicho tipo Santal 33. Sándalo cremoso con un acorde de iris y cuero suave. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5C4A3A', accent: '#A89178', shadow: 'rgba(168,145,120,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 25000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 35000, stock: 16 },
      { size: '75ml', tier: 'AA', price: 45000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 90000, stock: 9 },
      { size: '100ml', tier: 'AAA', price: 180000, stock: 5 },
    ],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'insp-coco',
    name: 'Esencia inspirada en Coco Mademoiselle',
    inspiredBy: 'Chanel Coco Mademoiselle',
    type: 'inspirado',
    family: 'Oriental Floral',
    gender: 'Mujer',
    notes: 'Naranja · Bergamota · Rosa · Jazmín · Pachulí · Vainilla',
    description: 'Esencia inspirada en el perfil oriental floral femenino tipo Coco Mademoiselle. Apertura cítrica, corazón floral, fondo de pachulí y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D2A1F', accent: '#8A5A3D', shadow: 'rgba(138,90,61,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 28 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 25 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 20 },
      { size: '100ml', tier: 'AA', price: 88000, stock: 16 },
      { size: '100ml', tier: 'AAA', price: 180000, stock: 8 },
    ],
    imageUrl: '',
    bestseller: true,
  },
  {
    id: 'insp-lightblue',
    name: 'Esencia inspirada en Light Blue Pour Homme',
    inspiredBy: 'Dolce & Gabbana Light Blue Pour Homme',
    type: 'inspirado',
    family: 'Cítrico Aromático',
    gender: 'Hombre',
    notes: 'Limón · Manzana · Bambú · Rosa · Madera de cedro · Almizcle',
    description: 'Esencia inspirada en el perfil cítrico fresco femenino tipo Light Blue. Frescura mediterránea con un fondo limpio de cedro. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A3D4A', accent: '#5C8AA0', shadow: 'rgba(92,138,160,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 32 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 25 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 20 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 15 },
    ],
    imageUrl: '/images/products/insp-lightblue.png',
  },
  {
    id: 'insp-montblanc-legend',
    name: 'Esencia inspirada en Montblanc Legend',
    inspiredBy: 'Montblanc Legend',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Bergamota · Lavanda · Manzana · Sándalo · Haba tonka · Almizcle',
    description: 'Esencia inspirada en el perfil aromático frutal masculino tipo Legend de Montblanc. Frescura aromática con un fondo cremoso de tonka. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#5C5C5C', shadow: 'rgba(92,92,92,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 22 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 14 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 10 },
    ],
    imageUrl: '',
  },
  {
    id: 'insp-diesel-plus',
    name: 'Esencia inspirada en Diesel Plus',
    inspiredBy: 'Diesel Plus Plus',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Hombre',
    notes: 'Pimienta · Cardamomo · Cuero · Cedro · Vetiver · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado especiado tipo Diesel Plus. Apertura especiada, fondo de cuero y maderas. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#5C4A2B', shadow: 'rgba(92,74,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 16 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 10 },
    ],
    imageUrl: '/images/products/insp-diesel-plus.png',
  },
  {
    id: 'insp-212-forever-young',
    name: 'Esencia inspirada en 212 Forever Young',
    inspiredBy: 'Carolina Herrera 212 Men Forever Young',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Pomelo · Pera · Cedro · Pachulí · Ámbar · Almizcle',
    description: 'Esencia inspirada en el perfil aromático fresco tipo 212 Forever Young. Frescura cítrica frutal con un fondo limpio amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#6B7280', shadow: 'rgba(107,114,128,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 18000, stock: 22 },
      { size: '50ml', tier: 'AA', price: 28000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 38000, stock: 14 },
      { size: '100ml', tier: 'AA', price: 75000, stock: 11 },
      { size: '100ml', tier: 'AAA', price: 155000, stock: 7 },
    ],
    imageUrl: '/images/products/insp-212-forever-young.png',
  },
  {
    id: 'insp-212-heroes',
    name: 'Esencia inspirada en 212 Heroes',
    inspiredBy: 'Carolina Herrera 212 Heroes',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Manzana · Cardamomo · Maderas · Almizcle · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado aromático tipo 212 Heroes. Apertura fresca, corazón aromático especiado, fondo amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 22 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 14 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 10 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 6 },
    ],
    imageUrl: '/images/products/insp-212-heroes.png',
  },
  {
    id: 'insp-212-sexy-men',
    name: 'Esencia inspirada en 212 Sexy Men',
    inspiredBy: 'Carolina Herrera 212 Sexy Men',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta · Cardamomo · Pachulí · Almizcle · Vainilla',
    description: 'Esencia inspirada en el perfil oriental especiado tipo 212 Sexy Men. Apertura cítrica especiada, fondo cálido oriental. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D1A1F', accent: '#A8475C', shadow: 'rgba(168,71,92,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 14 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 8 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 5 },
    ],
    imageUrl: '/images/products/insp-212-sexy-men.png',
  },
  {
    id: 'insp-invictus-victory-negro',
    name: 'Esencia inspirada en Invictus Victory',
    inspiredBy: 'Paco Rabanne Invictus Victory',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Saffron · Lavanda · Pachulí · Ámbar · Mirra',
    description: 'Esencia inspirada en el perfil oriental aromático tipo Invictus Victory. Apertura especiada, corazón aromático, fondo oriental denso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 15 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 9 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 6 },
    ],
    imageUrl: '/images/products/insp-invictus-victory-negro.png',
  },
  {
    id: 'insp-ultra-male',
    name: 'Esencia inspirada en Ultra Male',
    inspiredBy: 'Jean Paul Gaultier Ultra Male',
    type: 'inspirado',
    family: 'Gourmand Aromático',
    gender: 'Hombre',
    notes: 'Pera · Lavanda · Canela · Caramelo · Vainilla · Ámbar',
    description: 'Esencia inspirada en el perfil gourmand aromático tipo Ultra Male de Jean Paul Gaultier. Apertura jugosa, corazón aromático especiado, fondo dulce de caramelo y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F1F4A', accent: '#2A3F8A', shadow: 'rgba(42,63,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 16 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 10 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 6 },
    ],
    imageUrl: '/images/products/insp-ultra-male.png',
  },
  {
    id: 'insp-le-male-lover',
    name: 'Esencia inspirada en Le Male Lover',
    inspiredBy: 'Jean Paul Gaultier Le Male Lover',
    type: 'inspirado',
    family: 'Aromático Especiado',
    gender: 'Hombre',
    notes: 'Lavanda · Canela · Cuero · Vainilla · Maderas',
    description: 'Esencia inspirada en el perfil aromático especiado tipo Le Male Lover. Versión más intensa y especiada del clásico Le Male. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F35', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 14 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 9 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 5 },
    ],
    imageUrl: '/images/products/insp-le-male-lover.png',
  },
  {
    id: 'insp-le-beau',
    name: 'Esencia inspirada en Le Beau Le Parfum',
    inspiredBy: 'Jean Paul Gaultier Le Beau Le Parfum',
    type: 'inspirado',
    family: 'Amaderado Coco',
    gender: 'Hombre',
    notes: 'Bergamota · Coco · Sándalo · Haba tonka · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado coco tipo Le Beau Le Parfum. Apertura cítrica fresca, corazón de coco, fondo cremoso amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A2A1F', accent: '#2D5A3D', shadow: 'rgba(45,90,61,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 16 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 13 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 10 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 8 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 5 },
    ],
    imageUrl: '/images/products/insp-le-beau.png',
  },
  {
    id: 'insp-scandal-pour-homme',
    name: 'Esencia inspirada en Scandal Pour Homme',
    inspiredBy: 'Jean Paul Gaultier Scandal Pour Homme',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Mandarina · Lavanda · Caramelo · Pachulí · Cuero',
    description: 'Esencia inspirada en el perfil oriental aromático tipo Scandal Pour Homme. Apertura cítrica fresca, corazón aromático, fondo de caramelo y cuero. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A2545', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 15 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 9 },
    ],
    imageUrl: '/images/products/insp-scandal-pour-homme.png',
  },
  {
    id: 'insp-eros',
    name: 'Esencia inspirada en Eros',
    inspiredBy: 'Versace Eros',
    type: 'inspirado',
    family: 'Aromático Fougère',
    gender: 'Hombre',
    notes: 'Menta · Manzana verde · Haba tonka · Vainilla · Cedro · Ámbar',
    description: 'Esencia inspirada en el perfil aromático fougère tipo Eros de Versace. Apertura fresca de menta, corazón aromático, fondo dulce de tonka y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F4A', accent: '#1E4A8A', shadow: 'rgba(30,74,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 26 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 22 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 18 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 14 },
      { size: '100ml', tier: 'AAA', price: 165000, stock: 8 },
    ],
    imageUrl: '/images/products/insp-eros.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-valentino-intense',
    name: 'Esencia inspirada en Valentino Uomo Intense',
    inspiredBy: 'Valentino Uomo Intense',
    type: 'inspirado',
    family: 'Oriental Cuero',
    gender: 'Hombre',
    notes: 'Bergamota · Mirto · Iris · Cuero · Vainilla · Ámbar',
    description: 'Esencia inspirada en el perfil oriental cuero tipo Valentino Uomo Intense. Apertura cítrica, corazón aromático, fondo cálido de cuero y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 22000, stock: 18 },
      { size: '50ml', tier: 'AA', price: 32000, stock: 15 },
      { size: '75ml', tier: 'AA', price: 42000, stock: 12 },
      { size: '100ml', tier: 'AA', price: 85000, stock: 9 },
      { size: '100ml', tier: 'AAA', price: 175000, stock: 5 },
    ],
    imageUrl: '/images/products/insp-valentino-intense.png',
  },
];

const BRANDS = ['Lattafa', 'Armaf', 'Afnan', 'Bharara'];
const FAMILIES = ['Oriental Dulce', 'Oriental Café', 'Oud Frutal', 'Amaderado Aromático', 'Oriental Cuero', 'Oriental Especiado', 'Aromático Fougère', 'Floral Oriental', 'Gourmand Frutal', 'Aromático Frutal', 'Aromático Fresco', 'Acuático Amaderado', 'Aromático Cítrico', 'Oriental Floral', 'Cítrico Fresco'];

const fmt = (n) => `$${n.toLocaleString('es-CO')}`;
const minPrice = (p) => Math.min(...p.variants.map(v => v.price));
const maxPrice = (p) => Math.max(...p.variants.map(v => v.price));
const totalStock = (p) => p.variants.reduce((s, v) => s + v.stock, 0);

// ============================================================
// PRODUCT IMAGE — Photographic style on white
// ============================================================
const ProductImage = ({ product, aspect = 'aspect-square', size = 'md' }) => {
  const { primary, accent, shadow } = product.color;
  const isInsp = product.type === 'inspirado';
  
  // If real product image URL is provided, use it instead of CSS bottle
  if (product.imageUrl && product.imageUrl.trim() !== '') {
    return (
      <div className={`relative ${aspect} bg-white overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 50% 70%, ${primary}08 0%, transparent 65%)`
        }} />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="relative max-w-[85%] max-h-[85%] object-contain"
          style={{ filter: `drop-shadow(0 20px 30px ${shadow})` }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {isInsp && (
          <div className="absolute top-2 right-2 px-2 py-0.5 f-archivo text-[8px] tracking-[0.18em] font-bold uppercase" style={{ background: C.navy, color: 'white' }}>
            Esencia inspirada
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`relative ${aspect} bg-white overflow-hidden flex items-end justify-center`}>
      {/* Background subtle gradient */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 50% 70%, ${primary}10 0%, transparent 65%)`
      }} />
      {/* Floor shadow ellipse */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[60%] h-3 rounded-full blur-md" style={{ background: shadow }} />
      {/* "Esencia inspirada" badge */}
      {isInsp && (
        <div className="absolute top-2 right-2 px-2 py-0.5 f-archivo text-[8px] tracking-[0.18em] font-bold uppercase z-10" style={{ background: C.navy, color: 'white' }}>
          Esencia inspirada
        </div>
      )}
      
      {/* Bottle */}
      <div className="relative w-[42%] h-[78%] mb-[10%]" style={{ filter: `drop-shadow(0 25px 35px ${shadow})` }}>
        {/* Cap */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[12%] rounded-t-sm" style={{
          background: `linear-gradient(180deg, #2A2520 0%, #1A1612 50%, #0A0805 100%)`,
        }} />
        {/* Cap detail line */}
        <div className="absolute left-[18%] right-[18%] h-[1.5%]" style={{ top: '11%', background: '#0a0805' }} />
        {/* Neck */}
        <div className="absolute left-[28%] right-[28%] h-[8%]" style={{
          top: '12.5%',
          background: `linear-gradient(180deg, ${primary}90 0%, ${primary}70 100%)`,
        }} />
        {/* Shoulder */}
        <div className="absolute left-[5%] right-[5%] h-[6%]" style={{
          top: '20%',
          background: `linear-gradient(180deg, ${accent} 0%, ${primary} 100%)`,
          clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
        }} />
        {/* Body */}
        <div className="absolute left-0 right-0 rounded-b-sm" style={{
          top: '25%',
          bottom: 0,
          background: `linear-gradient(135deg, ${primary} 0%, ${accent} 35%, ${primary} 60%, ${accent}CC 100%)`,
        }}>
          {/* Highlight strip left */}
          <div className="absolute left-[8%] top-[5%] bottom-[5%] w-[8%]" style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 100%)`,
            filter: 'blur(2px)',
          }} />
          {/* Highlight right */}
          <div className="absolute right-[12%] top-[10%] bottom-[10%] w-[3%]" style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)`,
            filter: 'blur(1px)',
          }} />
          {/* Label */}
          <div className="absolute left-[12%] right-[12%] top-[35%] bottom-[30%] flex flex-col items-center justify-center text-center px-1" style={{
            background: 'linear-gradient(180deg, #FAFAF7 0%, #F0EDE6 100%)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
          }}>
            <div className="f-archivo font-black text-[7px] tracking-[0.15em]" style={{ color: C.navy }}>NOVA</div>
            <div className="f-archivo font-bold text-[5px] tracking-[0.2em]" style={{ color: C.orange }}>IMPORT</div>
            <div className="w-3 border-t my-[3px]" style={{ borderColor: primary, opacity: 0.4 }} />
            <div className="f-fraunces italic text-[7px] leading-tight" style={{ color: '#1A1612' }}>
              {isInsp ? product.inspiredBy?.replace('tipo ', '') : product.name}
            </div>
            <div className="f-archivo text-[4px] tracking-[0.2em] mt-[1px]" style={{ color: '#6B5A4A' }}>EAU DE PARFUM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MARQUEE
// ============================================================
const Marquee = () => (
  <div className="overflow-hidden text-white" style={{ background: C.navy }}>
    <div className="flex marquee whitespace-nowrap py-2.5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-10 px-5 f-archivo text-xs font-medium tracking-wide">
          <span>✈ IMPORTAMOS DIRECTO DESDE DUBÁI</span>
          <span style={{ color: C.orange }}>·</span>
          <span>📦 ENVÍO GRATIS DESDE $150.000</span>
          <span style={{ color: C.orange }}>·</span>
          <span>💳 PAGA CON ADDI HASTA EN 4 CUOTAS</span>
          <span style={{ color: C.orange }}>·</span>
          <span>🇦🇪 MARCAS ÁRABES 100% ORIGINALES</span>
          <span style={{ color: C.orange }}>·</span>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// HEADER
// ============================================================
const Header = ({ onNavigate, currentView, cartCount, onCartOpen }) => {
  const [open, setOpen] = useState(false);
  const links = [
    { id: 'catalog-hombre', label: 'Hombre' },
    { id: 'catalog-mujer', label: 'Mujer' },
    { id: 'catalog-arabe', label: 'Marcas árabes' },
    { id: 'catalog-inspirado', label: 'Inspirados' },
    { id: 'catalog-bestsellers', label: 'Más vendidos', highlight: true },
    { id: 'maison', label: 'Nosotros' },
  ];
  
  return (
    <>
      <Marquee />
      <header className="sticky top-0 z-40 bg-white border-b" style={{ borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex items-center gap-6">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} style={{ color: C.navy }} />
          </button>
          
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <Logo />
          </button>
          
          <nav className="hidden lg:flex items-center gap-7 ml-6 f-archivo text-sm font-semibold">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => onNavigate(l.id)}
                className={`hover:opacity-70 transition-opacity ${l.highlight ? 'flex items-center gap-1.5' : ''}`}
                style={{ color: l.highlight ? C.orange : C.ink }}
              >
                {l.highlight && <Star size={12} fill={C.orange} />}
                {l.label}
              </button>
            ))}
          </nav>
          
          <div className="flex-1 max-w-md relative hidden md:block ml-4">
            <input
              className="w-full bg-stone-100 px-4 py-2.5 pl-10 text-sm rounded-full focus:outline-none focus:ring-2 f-dm"
              placeholder="Buscar perfume, marca, familia…"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
          </div>
          
          <div className="flex gap-4 items-center" style={{ color: C.navy }}>
            <button className="hidden sm:block"><Search size={20} className="md:hidden" /></button>
            <button onClick={() => onNavigate('track')} className="hidden sm:block" title="Seguimiento">
              <Package size={20} />
            </button>
            <button onClick={() => onNavigate('account')} className="hidden sm:block">
              <User size={20} />
            </button>
            <button onClick={onCartOpen} className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold f-archivo" style={{ background: C.orange }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Subnav */}
        <div className="border-t hidden lg:block" style={{ borderColor: '#E5E5E0', background: '#FAFAF7' }}>
          <div className="max-w-[1400px] mx-auto px-8 py-2.5 flex gap-6 text-xs f-archivo font-medium overflow-x-auto" style={{ color: C.muted }}>
            <span className="flex items-center gap-1.5"><Truck size={12} /> Envío 24-72h a todo Colombia</span>
            <span className="flex items-center gap-1.5"><Shield size={12} /> Garantía de autenticidad</span>
            <span className="flex items-center gap-1.5"><Lock size={12} /> Pago seguro Wompi · Bold</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={12} /> Atención por WhatsApp</span>
          </div>
        </div>
      </header>
      
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#E5E5E0' }}>
            <Logo />
            <button onClick={() => setOpen(false)}><X size={22} /></button>
          </div>
          <nav className="p-6 space-y-1 f-archivo">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => { onNavigate(l.id); setOpen(false); }}
                className="block w-full text-left py-3 text-xl font-bold border-b"
                style={{ borderColor: '#F0EDE6', color: l.highlight ? C.orange : C.ink }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

// ============================================================
// PRODUCT CARD
// ============================================================
const ProductCard = ({ product, onClick }) => {
  const stock = totalStock(product);
  const min = minPrice(product);
  const hasRange = product.variants.length > 1;
  
  return (
    <div className="group cursor-pointer bg-white" onClick={onClick}>
      <div className="relative">
        <ProductImage product={product} aspect="aspect-square" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="text-white px-2 py-1 text-[10px] f-archivo font-black tracking-wider" style={{ background: C.orange }}>
              BESTSELLER
            </span>
          )}
          {product.type === 'arabe' && (
            <span className="text-white px-2 py-1 text-[10px] f-archivo font-bold tracking-wider" style={{ background: C.navy }}>
              ÁRABE ORIGINAL
            </span>
          )}
          {product.type === 'inspirado' && product.featured && (
            <span className="bg-stone-900 text-white px-2 py-1 text-[10px] f-archivo font-bold tracking-wider">
              DESTACADO
            </span>
          )}
        </div>
        
        {/* Stock indicator */}
        {stock < 10 && stock > 0 && (
          <span className="absolute top-3 right-3 bg-amber-50 text-amber-800 px-2 py-1 text-[10px] f-archivo font-bold border border-amber-300">
            ÚLTIMAS {stock}
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-3 right-3 bg-stone-100 text-stone-500 px-2 py-1 text-[10px] f-archivo font-bold border">
            AGOTADO
          </span>
        )}
        
        {/* Heart */}
        <button className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform" onClick={(e) => e.stopPropagation()}>
          <Heart size={14} strokeWidth={2} style={{ color: C.navy }} />
        </button>
      </div>
      
      <div className="pt-3 px-1 space-y-1">
        <div className="flex items-center gap-2 text-[10px] f-archivo font-bold tracking-wider" style={{ color: C.muted }}>
          {product.type === 'arabe' ? (
            <span style={{ color: C.navy }}>{product.brand.toUpperCase()}</span>
          ) : (
            <span style={{ color: C.orange }}>ÁMBAR PERFUMERÍA</span>
          )}
          <span>·</span>
          <span>{product.family.toUpperCase()}</span>
        </div>
        <h3 className="f-archivo font-bold text-base leading-tight" style={{ color: C.ink }}>
          {product.name}
        </h3>
        <p className="text-xs line-clamp-1 f-dm" style={{ color: C.muted }}>{product.notes}</p>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="f-archivo font-black text-lg" style={{ color: C.ink }}>{fmt(min)}</span>
          {hasRange && <span className="f-dm text-xs" style={{ color: C.muted }}>desde · {product.variants[0].size}</span>}
        </div>
        <div className="flex items-center gap-1 text-xs pt-1">
          <Star size={11} fill={C.orange} style={{ color: C.orange }} />
          <span className="f-archivo font-bold">{(4.6 + Math.random() * 0.3).toFixed(1)}</span>
          <span className="f-dm" style={{ color: C.muted }}>({Math.floor(Math.random() * 150) + 30})</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// HOME
// ============================================================
const Home = ({ onNavigate, onSelectProduct }) => {
  const arabes = PRODUCTS.filter(p => p.type === 'arabe');
  const inspirados = PRODUCTS.filter(p => p.type === 'inspirado');
  const bestsellers = PRODUCTS.filter(p => p.bestseller);
  
  return (
    <main className="bg-white f-dm">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}>
        <div className="absolute inset-0 opacity-30" style={{
          background: `radial-gradient(circle at 80% 50%, ${C.orange}40 0%, transparent 50%)`
        }} />
        <div className="absolute inset-0 grain opacity-50" />
        
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full f-archivo text-xs font-bold tracking-wider" style={{ background: 'rgba(245,130,32,0.2)', color: C.orange }}>
              <Sparkles size={12} /> IMPORTACIÓN DIRECTA · DUBÁI
            </div>
            <h1 className="f-archivo font-black text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Tu firma<br />olfativa<br />
              <span style={{ color: C.orange }}>al precio justo.</span>
            </h1>
            <p className="text-white/80 max-w-md text-lg leading-relaxed">
              Perfumes árabes 100% originales y esencias inspiradas de alta calidad. Desde $15.000. Despachamos a toda Colombia en 24-72 horas.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => onNavigate('catalog')} className="px-7 py-4 f-archivo font-bold text-sm tracking-wide flex items-center gap-3 hover:scale-105 transition-transform" style={{ background: C.orange, color: 'white' }}>
                EXPLORAR CATÁLOGO <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('catalog-bestsellers')} className="border-2 border-white text-white px-7 py-4 f-archivo font-bold text-sm tracking-wide hover:bg-white hover:text-stone-900 transition-colors">
                LOS MÁS VENDIDOS
              </button>
            </div>
            <div className="flex gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2"><Star size={14} fill={C.orange} style={{ color: C.orange }} /><span><strong className="f-archivo">4.9</strong> · 1.847 reseñas</span></div>
              <div className="flex items-center gap-2"><Check size={14} style={{ color: C.orange }} /><span>+5.000 clientes</span></div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white"><ProductImage product={PRODUCTS[0]} aspect="aspect-[3/4]" /></div>
                <div className="bg-white"><ProductImage product={PRODUCTS[7]} aspect="aspect-square" /></div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-white"><ProductImage product={PRODUCTS[3]} aspect="aspect-square" /></div>
                <div className="bg-white"><ProductImage product={PRODUCTS[9]} aspect="aspect-[3/4]" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust strip */}
      <section className="border-b" style={{ borderColor: '#E5E5E0', background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: Award, title: '100% Originales', sub: 'Marcas árabes certificadas' },
            { icon: Truck, title: 'Envío 24-72h', sub: 'Toda Colombia · Servientrega' },
            { icon: Shield, title: 'Compra segura', sub: 'Wompi · Bold · PayU' },
            { icon: MessageCircle, title: 'Atención WhatsApp', sub: 'Lun-Sáb 8am-8pm' },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-center justify-center gap-3">
                <Icon size={28} strokeWidth={1.5} style={{ color: C.orange }} />
                <div className="text-left">
                  <div className="f-archivo font-bold text-sm">{t.title}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{t.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Categories grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="f-archivo font-black text-3xl lg:text-4xl mb-2">Encuentra tu próxima firma</h2>
            <p className="text-stone-600">Filtrado por tu estilo</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'catalog-hombre', label: 'PARA ÉL', sub: 'Aromáticos · Cuero · Cítricos', color: C.navy },
              { id: 'catalog-mujer', label: 'PARA ELLA', sub: 'Florales · Frutales · Dulces', color: '#A8475C' },
              { id: 'catalog-arabe', label: 'MARCAS ÁRABES', sub: 'Lattafa · Armaf · Afnan', color: C.orange },
              { id: 'catalog-inspirado', label: 'INSPIRADOS', sub: 'Familia olfativa premium', color: '#2A6B4A' },
            ].map(c => (
              <button key={c.id} onClick={() => onNavigate(c.id)} className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden group" style={{ background: c.color }}>
                <div className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(180deg, ${c.color}DD 0%, ${c.color} 100%)` }} />
                <div className="absolute inset-0 grain opacity-30" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="f-archivo font-black text-2xl lg:text-3xl tracking-tight mb-1">{c.label}</div>
                  <div className="text-xs lg:text-sm opacity-80 mb-3">{c.sub}</div>
                  <div className="flex items-center gap-2 f-archivo font-bold text-xs">
                    EXPLORAR <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bestsellers */}
      <section className="py-12 lg:py-16" style={{ background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="f-mono mb-2" style={{ color: C.orange }}>★ MÁS VENDIDOS</div>
              <h2 className="f-archivo font-black text-3xl lg:text-4xl">Los favoritos del mes</h2>
            </div>
            <button onClick={() => onNavigate('catalog-bestsellers')} className="hidden md:flex items-center gap-2 f-archivo font-bold text-sm hover:gap-3 transition-all" style={{ color: C.navy }}>
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {bestsellers.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
        </div>
      </section>
      
      {/* Promo banners */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-4">
          <div className="p-8 lg:p-10 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}>
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 100% 0%, ${C.orange} 0%, transparent 50%)` }} />
            <div className="relative">
              <div className="f-archivo text-xs font-bold tracking-wider mb-2" style={{ color: C.orange }}>SET DESCUBRIMIENTO</div>
              <div className="f-archivo font-black text-3xl lg:text-4xl leading-tight mb-3">5 muestras<br />a tu elección.</div>
              <div className="mb-4 text-white/80">Prueba antes de comprar el frasco. 5 esencias de 5ml.</div>
              <button className="px-6 py-3 f-archivo font-bold text-sm" style={{ background: C.orange }}>
                $35.000 · PEDIR
              </button>
            </div>
          </div>
          <div className="p-8 lg:p-10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)` }}>
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 0% 100%, ${C.navy} 0%, transparent 50%)` }} />
            <div className="relative text-white">
              <div className="f-archivo text-xs font-bold tracking-wider mb-2 opacity-90">PROMO COMBO</div>
              <div className="f-archivo font-black text-3xl lg:text-4xl leading-tight mb-3">Lleva 2,<br />paga 1.5.</div>
              <div className="mb-4 opacity-90">En toda la línea de inspirados de 50ml y 75ml.</div>
              <button className="px-6 py-3 f-archivo font-bold text-sm text-white" style={{ background: C.navy }}>
                APROVECHAR
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brands Strip - Árabes */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <div className="f-mono mb-3" style={{ color: C.navy }}>🇦🇪 MARCAS ÁRABES ORIGINALES</div>
            <h2 className="f-archivo font-black text-3xl lg:text-4xl mb-3">Importados directo desde Dubái</h2>
            <p style={{ color: C.muted }}>Lattafa, Armaf, Afnan, Bharara. Las casas árabes más reconocidas del mundo, con certificado de autenticidad.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-10">
            {BRANDS.map(b => (
              <div key={b} className="px-6 py-3 border-2 rounded-full f-archivo font-bold" style={{ borderColor: C.navy, color: C.navy }}>{b}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {arabes.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => onNavigate('catalog-arabe')} className="px-7 py-3.5 f-archivo font-bold text-sm tracking-wide border-2 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors" style={{ borderColor: C.ink, color: C.ink }}>
              VER TODOS LOS ÁRABES
            </button>
          </div>
        </div>
      </section>
      
      {/* CATÁLOGO COMPLETO — Ámbar Perfumería Esencias Inspiradas */}
      <section className="py-16 lg:py-20" style={{ background: C.warm }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          {/* Section header */}
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <div className="f-mono mb-3" style={{ color: C.orange }}>★ ÁMBAR PERFUMERÍA · CATÁLOGO COMPLETO</div>
            <h2 className="f-archivo font-black text-3xl lg:text-5xl mb-4">Esencias Inspiradas</h2>
            <p className="text-base lg:text-lg" style={{ color: C.muted }}>
              Nuestra línea propia de fragancias con perfiles olfativos inspirados en grandes casas de perfumería. Disponibles en 30, 50, 75 y 100 ml. Dos calidades: <strong>AA estándar</strong> y <strong>AAA premium</strong>.
            </p>
          </div>
          
          {/* LEGAL DISCLAIMER — prominent banner */}
          <div className="max-w-3xl mx-auto mb-10 p-5 lg:p-6 border-2 flex items-start gap-3" style={{ borderColor: C.navy, background: 'rgba(27,58,111,0.04)' }}>
            <Info size={20} className="shrink-0 mt-0.5" style={{ color: C.navy }} strokeWidth={2} />
            <div className="text-xs lg:text-sm leading-relaxed" style={{ color: C.ink }}>
              <strong className="f-archivo tracking-wide" style={{ color: C.navy }}>AVISO IMPORTANTE.</strong>{' '}
              Los productos de la línea <strong>Ámbar Perfumería</strong> son <strong>esencias inspiradas</strong> en perfiles olfativos de fragancias comerciales reconocidas. <strong>No son los perfumes originales</strong>. No están afiliados, autorizados ni producidos por las casas matrices referenciadas. Las marcas mencionadas son propiedad de sus respectivos titulares y se citan únicamente como referencia descriptiva del perfil olfativo del producto.
            </div>
          </div>
          
          {/* Full inspirados grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {inspirados.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          
          <div className="text-center mt-10">
            <button onClick={() => onNavigate('catalog-inspirado')} className="px-7 py-3.5 f-archivo font-bold text-sm tracking-wide border-2 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors" style={{ borderColor: C.ink, color: C.ink }}>
              FILTRAR Y EXPLORAR LÍNEA COMPLETA
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16" style={{ background: C.navy }}>
        <div className="max-w-2xl mx-auto px-6 text-center text-white space-y-6">
          <Sparkles size={28} className="mx-auto" style={{ color: C.orange }} strokeWidth={1.5} />
          <h3 className="f-archivo font-black text-3xl lg:text-4xl leading-tight">10% de descuento en tu primer pedido</h3>
          <p className="text-white/80">Suscríbete y recibe ofertas exclusivas, lanzamientos y restocks.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input type="email" placeholder="tu@correo.com" className="flex-1 bg-white/10 border border-white/20 px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60" />
            <button className="px-7 py-3.5 f-archivo font-bold text-sm" style={{ background: C.orange }}>SUSCRIBIRME</button>
          </div>
          <p className="text-xs text-white/50">Datos tratados conforme a la Ley 1581 de 2012. Sin spam.</p>
        </div>
      </section>
    </main>
  );
};

// ============================================================
// CATALOG
// ============================================================
const Catalog = ({ initialFilter = {}, onSelectProduct, title = 'Catálogo completo' }) => {
  const [filters, setFilters] = useState({
    gender: initialFilter.gender || 'todos',
    type: initialFilter.type || 'todos',
    brand: 'todos',
    family: 'todos',
    ...initialFilter,
  });
  const [sort, setSort] = useState('relevance');
  
  let products = PRODUCTS.filter(p => {
    if (filters.bestseller && !p.bestseller) return false;
    if (filters.gender !== 'todos' && p.gender !== filters.gender && p.gender !== 'Unisex') return false;
    if (filters.type !== 'todos' && p.type !== filters.type) return false;
    if (filters.brand !== 'todos' && p.brand !== filters.brand) return false;
    if (filters.family !== 'todos' && p.family !== filters.family) return false;
    return true;
  });
  
  if (sort === 'price-asc') products = [...products].sort((a, b) => minPrice(a) - minPrice(b));
  if (sort === 'price-desc') products = [...products].sort((a, b) => maxPrice(b) - maxPrice(a));
  
  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-10 lg:py-12 border-b" style={{ background: C.cream, borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="f-mono mb-3" style={{ color: C.orange }}>EL CATÁLOGO</div>
          <h1 className="f-archivo font-black text-4xl lg:text-5xl mb-3">{title}</h1>
          <p style={{ color: C.muted }}>{products.length} fragancias disponibles · Envío a toda Colombia</p>
        </div>
      </section>
      
      {/* Filters */}
      <section className="border-b sticky top-20 bg-white z-20" style={{ borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 f-archivo text-xs font-bold mr-2" style={{ color: C.muted }}>
            <Filter size={14} /> FILTROS
          </div>
          {[
            { key: 'gender', label: 'Género', opts: ['todos', 'Hombre', 'Mujer', 'Unisex'] },
            { key: 'type', label: 'Tipo', opts: [
              { v: 'todos', l: 'Todos' },
              { v: 'arabe', l: 'Marcas árabes' },
              { v: 'inspirado', l: 'Inspirados' },
            ]},
            { key: 'brand', label: 'Marca', opts: ['todos', ...BRANDS] },
          ].map(f => (
            <div key={f.key} className="relative">
              <select
                value={filters[f.key]}
                onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                className="appearance-none f-archivo text-sm font-semibold pl-4 pr-9 py-2 border rounded-full bg-white cursor-pointer hover:border-stone-400"
                style={{ borderColor: '#D5D5D0' }}
              >
                {f.opts.map(o => {
                  const v = typeof o === 'object' ? o.v : o;
                  const l = typeof o === 'object' ? o.l : o;
                  return <option key={v} value={v}>{v === 'todos' ? `${f.label}: Todos` : l}</option>;
                })}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none" />
            </div>
          ))}
          
          <div className="ml-auto relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none f-archivo text-sm font-semibold pl-4 pr-9 py-2 border rounded-full bg-white cursor-pointer"
              style={{ borderColor: '#D5D5D0' }}
            >
              <option value="relevance">Más relevantes</option>
              <option value="price-asc">Precio ascendente</option>
              <option value="price-desc">Precio descendente</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </section>
      
      {/* Grid */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          {products.length === 0 && (
            <div className="text-center py-20 f-dm" style={{ color: C.muted }}>
              No hay productos con esos filtros. <button onClick={() => setFilters({ gender: 'todos', type: 'todos', brand: 'todos', family: 'todos' })} className="underline" style={{ color: C.navy }}>Limpiar filtros</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ============================================================
// PRODUCT DETAIL
// ============================================================
const ProductDetail = ({ product, onBack, onAddToCart, onWhatsAppBuy, onSelectProduct }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('description');
  
  const handleAdd = () => {
    onAddToCart(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  const handleWhatsApp = () => {
    const msg = `Hola Nova Import, quiero pedir:\n${product.name}${product.inspiredBy ? ' ' + product.inspiredBy : ''}\nPresentación: ${selectedVariant.size} · ${selectedVariant.tier}\nCantidad: ${qty}\nTotal: ${fmt(selectedVariant.price * qty)}`;
    onWhatsAppBuy(msg);
  };
  
  const sizeGroups = product.variants.reduce((acc, v) => {
    if (!acc[v.size]) acc[v.size] = [];
    acc[v.size].push(v);
    return acc;
  }, {});
  
  const tiers = [...new Set(product.variants.filter(v => v.size === selectedVariant.size).map(v => v.tier))];
  
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.family === product.family || p.gender === product.gender)).slice(0, 4);
  
  return (
    <main className="bg-white min-h-screen f-dm">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 text-sm">
        <button onClick={onBack} className="flex items-center gap-1.5 hover:opacity-70 f-archivo font-medium" style={{ color: C.muted }}>
          <ChevronLeft size={14} /> Volver al catálogo
        </button>
      </div>
      
      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: image */}
          <div>
            <div className="bg-white border" style={{ borderColor: '#E5E5E0' }}>
              <ProductImage product={product} aspect="aspect-square" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-white border cursor-pointer hover:border-orange-500" style={{ borderColor: '#E5E5E0' }}>
                  <ProductImage product={product} aspect="aspect-square" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 f-archivo text-xs font-bold tracking-wider mb-2">
                {product.type === 'arabe' ? (
                  <>
                    <span style={{ color: C.navy }}>{product.brand.toUpperCase()}</span>
                    <span style={{ background: C.navy }} className="text-white px-2 py-0.5 text-[10px]">ÁRABE ORIGINAL</span>
                  </>
                ) : (
                  <span style={{ background: C.orange }} className="text-white px-2 py-0.5 text-[10px]">ÁMBAR PERFUMERÍA</span>
                )}
                <span style={{ color: C.muted }}>· {product.family}</span>
              </div>
              <h1 className="f-archivo font-black text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
              {product.inspiredBy && (
                <p className="mt-2 f-fraunces italic text-base lg:text-lg" style={{ color: C.muted }}>
                  Perfil olfativo inspirado en <span className="not-italic font-medium" style={{ color: C.ink }}>{product.inspiredBy}</span>
                </p>
              )}
              <div className="flex items-center gap-3 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={C.orange} style={{ color: C.orange }} />)}
                  <span className="f-archivo font-bold ml-1">4.8</span>
                </div>
                <span style={{ color: C.muted }}>· 127 reseñas</span>
                <span className="text-green-600 flex items-center gap-1 f-archivo font-bold text-xs"><Check size={12} /> En stock</span>
              </div>
            </div>
            
            {/* Price */}
            <div className="py-4 border-y" style={{ borderColor: '#E5E5E0' }}>
              <div className="f-archivo font-black text-4xl" style={{ color: C.ink }}>{fmt(selectedVariant.price)}</div>
              <div className="text-sm mt-1" style={{ color: C.muted }}>
                Hasta 4 cuotas de {fmt(Math.ceil(selectedVariant.price / 4))} con Addi
              </div>
            </div>
            
            {/* Size selector */}
            <div>
              <div className="f-archivo font-bold text-sm mb-2.5">Tamaño · Presentación</div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {Object.entries(sizeGroups).map(([size, vars]) => {
                  const v = vars[0];
                  const selected = selectedVariant.size === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedVariant(v)}
                      className={`border-2 p-3 text-center transition-all ${selected ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div className="f-archivo font-bold text-base">{size}</div>
                      <div className="f-archivo text-xs mt-0.5" style={{ color: C.muted }}>{fmt(Math.min(...vars.map(x => x.price)))}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Tier selector */}
            {tiers.length > 1 && (
              <div>
                <div className="f-archivo font-bold text-sm mb-2.5">Calidad</div>
                <div className="grid grid-cols-2 gap-2">
                  {tiers.map(t => {
                    const v = product.variants.find(x => x.size === selectedVariant.size && x.tier === t);
                    const selected = selectedVariant.tier === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedVariant(v)}
                        className={`border-2 p-3 text-left transition-all ${selected ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="f-archivo font-bold text-base">{t}</div>
                            <div className="f-archivo text-xs" style={{ color: C.muted }}>
                              {t === 'AAA' ? 'Premium · larga duración' : 'Calidad estándar'}
                            </div>
                          </div>
                          <div className="f-archivo font-bold">{fmt(v.price)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Quantity + CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="f-archivo font-bold text-sm">Cantidad</div>
                <div className="flex items-center border" style={{ borderColor: '#D5D5D0' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-stone-100"><Minus size={14} /></button>
                  <span className="px-4 f-archivo font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-stone-100"><Plus size={14} /></button>
                </div>
              </div>
              
              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all"
                style={{ background: added ? '#10B981' : C.navy, color: 'white' }}
              >
                {added ? <><CheckCircle2 size={16} /> AÑADIDO AL CARRITO</> : <><ShoppingBag size={16} /> AÑADIR AL CARRITO · {fmt(selectedVariant.price * qty)}</>}
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white transition-colors"
              >
                <MessageCircle size={16} /> COMPRAR POR WHATSAPP
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                <Truck size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.orange }} />
                <div><strong className="f-archivo">Envío 24-72h</strong><br />Gratis desde $150.000</div>
              </div>
              <div className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                <Shield size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.orange }} />
                <div><strong className="f-archivo">Garantía</strong><br />30 días devolución</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="border-t" style={{ borderColor: '#E5E5E0', background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
          <div className="flex gap-6 border-b mb-8" style={{ borderColor: '#E5E5E0' }}>
            {[
              { id: 'description', label: 'Descripción' },
              { id: 'notes', label: 'Notas olfativas' },
              { id: 'shipping', label: 'Envío y devoluciones' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-4 f-archivo font-bold text-sm border-b-2 transition-colors ${tab === t.id ? '' : 'border-transparent'}`}
                style={{ borderColor: tab === t.id ? C.orange : 'transparent', color: tab === t.id ? C.ink : C.muted }}
              >
                {t.label}
              </button>
            ))}
          </div>
          
          {tab === 'description' && (
            <div className="max-w-3xl space-y-4 f-dm leading-relaxed" style={{ color: '#3A3A3A' }}>
              <p>{product.description}</p>
              {product.type === 'inspirado' && (
                <p className="text-sm pt-4 border-t" style={{ color: C.muted, borderColor: '#E5E5E0' }}>
                  <strong>Nota legal:</strong> Producto inspirado en una fragancia comercial. No es el perfume original ni está asociado con la marca referida. Su composición olfativa busca evocar familia y estilo del original.
                </p>
              )}
            </div>
          )}
          
          {tab === 'notes' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <div className="f-archivo font-bold text-sm mb-3" style={{ color: C.orange }}>NOTAS</div>
                <p className="f-archivo text-xl">{product.notes}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>FAMILIA</div>
                  <div className="f-archivo font-bold">{product.family}</div>
                </div>
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>GÉNERO</div>
                  <div className="f-archivo font-bold">{product.gender}</div>
                </div>
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>TIPO</div>
                  <div className="f-archivo font-bold">Eau de Parfum</div>
                </div>
              </div>
            </div>
          )}
          
          {tab === 'shipping' && (
            <div className="max-w-3xl space-y-4 f-dm leading-relaxed" style={{ color: '#3A3A3A' }}>
              <p><strong className="f-archivo">Envíos:</strong> Despachamos a toda Colombia vía Servientrega y Coordinadora. Bogotá 24h, ciudades principales 48-72h, resto del país 3-5 días hábiles. Envío gratuito para compras desde $150.000.</p>
              <p><strong className="f-archivo">Devoluciones:</strong> Tienes 30 días desde la entrega para solicitar cambio o devolución, siempre que el producto esté sellado y sin abrir. Defectos de fábrica los cubrimos al 100%.</p>
              <p><strong className="f-archivo">Pago seguro:</strong> Procesamos pagos vía Wompi (Bancolombia), Bold o PayU. También aceptamos PSE, Nequi, Daviplata y pagos en cuotas con Addi.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Related */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="f-archivo font-black text-2xl lg:text-3xl mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================================
// CART DRAWER
// ============================================================
const CartDrawer = ({ open, onClose, cart, onUpdateQty, onRemove, onCheckout, onWhatsApp }) => {
  const subtotal = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
  const shipping = subtotal >= 150000 || subtotal === 0 ? 0 : 12000;
  const total = subtotal + shipping;
  
  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 transform transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#E5E5E0' }}>
          <h2 className="f-archivo font-black text-xl">Tu pedido ({cart.length})</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={36} className="mx-auto text-stone-300 mb-4" strokeWidth={1} />
              <p className="f-archivo font-bold mb-2">Tu carrito está vacío</p>
              <p className="text-sm" style={{ color: C.muted }}>Encuentra tu próxima fragancia favorita.</p>
            </div>
          ) : cart.map((item, i) => (
            <div key={`${item.product.id}-${item.variant.size}-${item.variant.tier}-${i}`} className="flex gap-3 pb-5 border-b" style={{ borderColor: '#E5E5E0' }}>
              <div className="w-20 h-24 bg-stone-50 flex-shrink-0">
                <ProductImage product={item.product} aspect="aspect-[5/6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="f-archivo font-bold text-sm leading-tight">{item.product.name}</h3>
                {item.product.inspiredBy && <div className="f-fraunces italic text-xs" style={{ color: C.muted }}>{item.product.inspiredBy}</div>}
                <div className="f-archivo text-xs mt-1" style={{ color: C.muted }}>{item.variant.size} · {item.variant.tier}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border" style={{ borderColor: '#D5D5D0' }}>
                    <button onClick={() => onUpdateQty(i, item.qty - 1)} className="px-2 py-1 hover:bg-stone-100"><Minus size={12} /></button>
                    <span className="px-3 f-archivo font-bold text-sm">{item.qty}</span>
                    <button onClick={() => onUpdateQty(i, item.qty + 1)} className="px-2 py-1 hover:bg-stone-100"><Plus size={12} /></button>
                  </div>
                  <span className="f-archivo font-bold text-sm">{fmt(item.variant.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(i)} className="text-stone-400 hover:text-red-500 flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t p-5 space-y-3" style={{ borderColor: '#E5E5E0', background: C.cream }}>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span style={{ color: C.muted }}>Subtotal</span><span className="f-archivo font-bold">{fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span style={{ color: C.muted }}>Envío {shipping === 0 && '(gratis 🎉)'}</span><span className="f-archivo font-bold">{shipping === 0 ? '—' : fmt(shipping)}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#E5E5E0' }}>
                <span className="f-archivo font-black text-lg">Total</span>
                <span className="f-archivo font-black text-lg">{fmt(total)}</span>
              </div>
            </div>
            <button onClick={onCheckout} className="w-full text-white py-3.5 f-archivo font-bold text-sm flex items-center justify-center gap-3" style={{ background: C.navy }}>
              <Lock size={14} /> PAGAR CON WOMPI · {fmt(total)}
            </button>
            <button onClick={onWhatsApp} className="w-full bg-green-500 text-white py-3.5 f-archivo font-bold text-sm flex items-center justify-center gap-3 hover:bg-green-600">
              <MessageCircle size={14} /> PEDIR POR WHATSAPP
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ============================================================
// TRACK ORDER
// ============================================================
const DEMO_ORDER = {
  number: 'NI-2026-0847',
  email: 'cliente@example.com',
  items: [
    { name: 'Khamrah · Lattafa', size: '100ml AAA', qty: 1, price: 165000 },
    { name: 'Aromático Frutal · tipo Bad Boy', size: '50ml AA', qty: 2, price: 28000 },
  ],
  total: 221000,
  address: 'Cl. 85 #11-53, Apto 402 · Chapinero, Bogotá',
  carrier: 'Servientrega',
  trackingNum: '9876543210',
  estDelivery: '19 may 2026',
  timeline: [
    { label: 'Pedido confirmado', date: '12 may, 14:32', done: true },
    { label: 'Pago verificado', date: '12 may, 14:35', done: true },
    { label: 'En preparación', date: '13 may, 09:14', done: true },
    { label: 'Enviado · Servientrega', date: '14 may, 11:20', done: true },
    { label: 'En tránsito', date: '17 may, 08:00', done: true, current: true },
    { label: 'Entregado', date: 'Estimado 19 may', done: false },
  ],
};

const TrackOrder = () => {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const submit = (e) => {
    e?.preventDefault();
    setError('');
    if (orderNum.trim().toUpperCase() === DEMO_ORDER.number && email.trim().toLowerCase() === DEMO_ORDER.email) {
      setResult(DEMO_ORDER);
    } else {
      setError('No encontramos un pedido con esos datos. Para la demo: NI-2026-0847 / cliente@example.com');
    }
  };
  
  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-12 lg:py-16 border-b" style={{ background: C.cream, borderColor: '#E5E5E0' }}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="f-mono mb-3" style={{ color: C.orange }}>SEGUIMIENTO</div>
          <h1 className="f-archivo font-black text-4xl lg:text-5xl mb-3">¿Dónde está mi pedido?</h1>
          <p style={{ color: C.muted }}>Ingresa tu número de orden y el correo de compra. También recibirás un email cada vez que cambie el estado.</p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          {!result ? (
            <form onSubmit={submit} className="bg-white border p-6 lg:p-10 space-y-5" style={{ borderColor: '#E5E5E0' }}>
              <div>
                <label className="f-archivo font-bold text-sm block mb-2">Número de pedido</label>
                <input value={orderNum} onChange={(e) => setOrderNum(e.target.value)} placeholder="NI-2026-XXXX" className="w-full border px-4 py-3 focus:outline-none focus:border-orange-500" style={{ borderColor: '#D5D5D0' }} />
              </div>
              <div>
                <label className="f-archivo font-bold text-sm block mb-2">Correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" type="email" className="w-full border px-4 py-3 focus:outline-none focus:border-orange-500" style={{ borderColor: '#D5D5D0' }} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full text-white py-4 f-archivo font-bold text-sm tracking-wide" style={{ background: C.navy }}>
                CONSULTAR ESTADO
              </button>
              <p className="text-xs text-center pt-2" style={{ color: C.muted }}>
                Demo: <span className="f-archivo font-bold">NI-2026-0847</span> · <span className="f-archivo font-bold">cliente@example.com</span>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-white border p-6 lg:p-8" style={{ borderColor: '#E5E5E0' }}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="f-mono" style={{ color: C.orange }}>PEDIDO</div>
                    <h2 className="f-archivo font-black text-2xl">{result.number}</h2>
                  </div>
                  <button onClick={() => setResult(null)} className="f-archivo font-bold text-sm" style={{ color: C.muted }}>
                    ← Consultar otro
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: '#E5E5E0' }}>
                  <div>
                    <div className="f-archivo text-xs font-bold tracking-wider mb-1" style={{ color: C.muted }}>ENTREGA ESTIMADA</div>
                    <div className="f-archivo font-black text-xl">{result.estDelivery}</div>
                  </div>
                  <div>
                    <div className="f-archivo text-xs font-bold tracking-wider mb-1" style={{ color: C.muted }}>TRANSPORTADORA</div>
                    <div className="f-archivo font-bold">{result.carrier} · {result.trackingNum}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border p-6 lg:p-8" style={{ borderColor: '#E5E5E0' }}>
                <h3 className="f-archivo font-black text-xl mb-5">Estado del envío</h3>
                {result.timeline.map((step, i) => (
                  <div key={i} className="flex gap-4 pb-5 relative">
                    {i < result.timeline.length - 1 && (
                      <div className="absolute left-[15px] top-9 bottom-0 w-px" style={{ background: step.done ? C.orange : '#E5E5E0' }} />
                    )}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{
                      background: step.current ? C.orange : (step.done ? C.orange : 'white'),
                      borderColor: step.done ? C.orange : '#D5D5D0',
                      color: step.done ? 'white' : '#D5D5D0',
                    }}>
                      {step.done ? <Check size={14} strokeWidth={3} /> : <Clock size={12} />}
                    </div>
                    <div>
                      <div className="f-archivo font-bold flex items-center gap-2 flex-wrap" style={{ color: step.done ? C.ink : C.muted }}>
                        {step.label}
                        {step.current && <span className="text-xs px-2 py-0.5 text-white" style={{ background: C.orange }}>ACTUAL</span>}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: C.muted }}>{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border p-6" style={{ borderColor: '#E5E5E0' }}>
                  <h3 className="f-archivo font-black mb-3">Productos</h3>
                  {result.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm py-1">
                      <span>{it.name} · {it.size} × {it.qty}</span>
                      <span className="f-archivo font-bold">{fmt(it.price * it.qty)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 mt-3 border-t" style={{ borderColor: '#E5E5E0' }}>
                    <span className="f-archivo font-black">Total</span>
                    <span className="f-archivo font-black">{fmt(result.total)}</span>
                  </div>
                </div>
                <div className="bg-white border p-6" style={{ borderColor: '#E5E5E0' }}>
                  <h3 className="f-archivo font-black mb-3">Dirección</h3>
                  <p className="text-sm">{result.address}</p>
                  <div className="mt-3 pt-3 border-t text-sm flex items-center gap-2" style={{ borderColor: '#E5E5E0', color: C.muted }}>
                    <Mail size={14} style={{ color: C.orange }} /> Notificaciones a {result.email}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ============================================================
// MAISON / NOSOTROS
// ============================================================
const Maison = () => (
  <main className="bg-white f-dm">
    <section className="py-16 lg:py-24" style={{ background: C.navy }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-white">
        <div className="f-mono mb-4" style={{ color: C.orange }}>NUESTRA HISTORIA</div>
        <h1 className="f-archivo font-black text-5xl lg:text-7xl leading-[0.95] mb-6">Nova Import S.A.S.</h1>
        <p className="text-xl lg:text-2xl text-white/80 max-w-2xl">Importamos las mejores fragancias del Medio Oriente y producimos esencias inspiradas de alta calidad. Directo del fabricante al cliente final.</p>
      </div>
    </section>
    
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-10 text-center">
        {[
          { num: '+5.000', label: 'Clientes satisfechos en Colombia' },
          { num: '4', label: 'Marcas árabes representadas' },
          { num: '120+', label: 'Fragancias en catálogo' },
        ].map((s, i) => (
          <div key={i}>
            <div className="f-archivo font-black text-6xl mb-2" style={{ color: C.orange }}>{s.num}</div>
            <p style={{ color: C.muted }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
    
    <section className="py-16 lg:py-20" style={{ background: C.cream }}>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-6">
        <h2 className="f-archivo font-black text-3xl lg:text-4xl">¿Por qué Nova Import?</h2>
        <div className="space-y-5">
          {[
            { title: 'Importación directa', text: 'Trabajamos directo con las fábricas en Dubái — Lattafa, Armaf, Afnan, Bharara. Sin intermediarios, sin sobrecostos.' },
            { title: 'Esencias premium', text: 'Producimos esencias inspiradas en dos calidades: AA (estándar) y AAA (premium con larga duración). Procesos de envejecimiento de 4-6 semanas.' },
            { title: 'Atención humana', text: 'Hablas por WhatsApp con personas reales, no con un bot. Asesoría olfativa antes de comprar, sin obligación.' },
            { title: 'Garantía total', text: '30 días para devolver o cambiar tu fragancia si no es lo que esperabas. Defectos de fábrica cubiertos al 100%.' },
          ].map((b, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 f-archivo font-black text-white" style={{ background: C.orange }}>
                {i + 1}
              </div>
              <div>
                <div className="f-archivo font-bold text-lg mb-1">{b.title}</div>
                <p style={{ color: C.muted }}>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

// ============================================================
// ADMIN
// ============================================================
const Admin = () => {
  const [orders, setOrders] = useState([
    { num: 'NI-2026-0847', client: 'María Restrepo', total: 221000, status: 'En tránsito', date: '12 may', city: 'Bogotá' },
    { num: 'NI-2026-0846', client: 'Andrés Vega', total: 165000, status: 'Preparando', date: '12 may', city: 'Medellín' },
    { num: 'NI-2026-0845', client: 'Camila Soto', total: 88000, status: 'Confirmado', date: '11 may', city: 'Cali' },
    { num: 'NI-2026-0844', client: 'Daniel Ortiz', total: 320000, status: 'Entregado', date: '10 may', city: 'Bogotá' },
    { num: 'NI-2026-0843', client: 'Laura Jiménez', total: 145000, status: 'Entregado', date: '10 may', city: 'Bucaramanga' },
  ]);
  
  const statuses = ['Confirmado', 'Pago verificado', 'Preparando', 'Enviado', 'En tránsito', 'Entregado', 'Cancelado'];
  
  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-8 border-b" style={{ background: C.navy, borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-white">
          <div className="f-mono mb-2" style={{ color: C.orange }}>VISTA INTERNA · NOVA IMPORT</div>
          <h1 className="f-archivo font-black text-3xl">Panel de pedidos</h1>
          <p className="text-white/70 mt-2 max-w-2xl">Vista demo. En producción Shopify Admin maneja esto nativamente y los correos se disparan solos en cada cambio de estado.</p>
        </div>
      </section>
      
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Pedidos hoy', val: '5' },
              { label: 'Ingresos hoy', val: fmt(939000) },
              { label: 'En tránsito', val: '12' },
              { label: 'Ticket promedio', val: fmt(187800) },
            ].map((k, i) => (
              <div key={i} className="bg-white border p-4" style={{ borderColor: '#E5E5E0' }}>
                <div className="f-archivo text-xs font-bold tracking-wider" style={{ color: C.muted }}>{k.label.toUpperCase()}</div>
                <div className="f-archivo font-black text-2xl mt-1">{k.val}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-white border overflow-x-auto" style={{ borderColor: '#E5E5E0' }}>
            <table className="w-full">
              <thead className="border-b" style={{ borderColor: '#E5E5E0', background: C.cream }}>
                <tr className="text-left">
                  {['Pedido', 'Cliente', 'Ciudad', 'Fecha', 'Total', 'Estado', 'Actualizar'].map(h => (
                    <th key={h} className="f-archivo text-xs font-bold tracking-wider px-5 py-3" style={{ color: C.muted }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.num} className="border-b hover:bg-stone-50" style={{ borderColor: '#F0EDE6' }}>
                    <td className="px-5 py-3 f-archivo font-bold text-sm">{o.num}</td>
                    <td className="px-5 py-3 text-sm">{o.client}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: C.muted }}>{o.city}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: C.muted }}>{o.date}</td>
                    <td className="px-5 py-3 f-archivo font-bold text-sm">{fmt(o.total)}</td>
                    <td className="px-5 py-3 text-sm">
                      <span className="f-archivo text-xs font-bold px-2.5 py-1" style={{
                        background: o.status === 'Entregado' ? '#D1FAE5' : o.status === 'En tránsito' ? '#FED7AA' : o.status === 'Cancelado' ? '#FEE2E2' : '#E0E7FF',
                        color: o.status === 'Entregado' ? '#065F46' : o.status === 'En tránsito' ? '#9A3412' : o.status === 'Cancelado' ? '#991B1B' : '#3730A3',
                      }}>{o.status.toUpperCase()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => setOrders(orders.map(x => x.num === o.num ? { ...x, status: e.target.value } : x))}
                        className="border text-sm px-2 py-1 bg-white"
                        style={{ borderColor: '#D5D5D0' }}
                      >
                        {statuses.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ onNavigate }) => (
  <footer style={{ background: C.navyDark, color: '#A8B5CC' }}>
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-14">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.orange }}>
              <Globe size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="f-archivo font-black text-xl text-white leading-none">Nova Import</div>
              <div className="f-archivo text-[9px] tracking-[0.25em] mt-0.5">PERFUMERÍA</div>
            </div>
          </div>
          <p className="text-sm">Importadores directos de perfumería árabe y esencias inspiradas premium.</p>
          <div className="flex gap-3">
            <Instagram size={20} className="hover:text-white cursor-pointer" />
            <Facebook size={20} className="hover:text-white cursor-pointer" />
            <MessageCircle size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">CATÁLOGO</div>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('catalog-hombre')} className="hover:text-white">Hombre</button></li>
            <li><button onClick={() => onNavigate('catalog-mujer')} className="hover:text-white">Mujer</button></li>
            <li><button onClick={() => onNavigate('catalog-arabe')} className="hover:text-white">Marcas árabes</button></li>
            <li><button onClick={() => onNavigate('catalog-inspirado')} className="hover:text-white">Inspirados</button></li>
            <li><button onClick={() => onNavigate('catalog-bestsellers')} className="hover:text-white">Más vendidos</button></li>
          </ul>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">AYUDA</div>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('track')} className="hover:text-white">Seguimiento de pedido</button></li>
            <li>Envíos y entregas</li>
            <li>Cambios y devoluciones</li>
            <li>Preguntas frecuentes</li>
            <li className="flex items-center gap-1.5"><MessageCircle size={12} /> WhatsApp · +57 317 364 1851</li>
            <li className="flex items-center gap-1.5"><Mail size={12} /> novaimportaciones190@gmail.com</li>
          </ul>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">LEGAL</div>
          <ul className="space-y-2 text-sm">
            <li>Política de privacidad</li>
            <li>Tratamiento de datos · Ley 1581</li>
            <li>Términos y condiciones</li>
            <li>Política de cookies</li>
            <li>Aviso de marcas</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-6 border-t flex flex-col md:flex-row gap-4 justify-between text-xs" style={{ borderColor: '#1A3055' }}>
        <div>© 2026 Nova Import S.A.S. · NIT 52.960.928-7 · Bogotá D.C., Colombia</div>
        <div className="flex gap-6 flex-wrap items-center f-archivo font-medium">
          <span>WOMPI</span><span>BOLD</span><span>PAYU</span><span>ADDI</span><span>SERVIENTREGA</span>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// COOKIE BANNER
// ============================================================
const CookieBanner = ({ onClose }) => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-lg" style={{ borderColor: '#E5E5E0' }}>
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-3 justify-between">
      <p className="text-sm" style={{ color: '#3A3A3A' }}>
        Usamos cookies para mejorar tu experiencia. Al continuar aceptas el tratamiento de datos según la <strong>Ley 1581 de 2012</strong>.
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={onClose} className="border px-4 py-2 f-archivo font-bold text-xs" style={{ borderColor: '#D5D5D0' }}>RECHAZAR</button>
        <button onClick={onClose} className="text-white px-4 py-2 f-archivo font-bold text-xs" style={{ background: C.navy }}>ACEPTAR</button>
      </div>
    </div>
  </div>
);

// ============================================================
// APP
// ============================================================
export default function App() {
  const [view, setView] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cookies, setCookies] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        if (window.storage?.get) {
          const s = await window.storage.get('cart_nova');
          if (s?.value) setCart(JSON.parse(s.value));
        }
      } catch {}
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      try {
        if (window.storage?.set) await window.storage.set('cart_nova', JSON.stringify(cart));
      } catch {}
    })();
  }, [cart]);
  
  const navigate = (v) => {
    setView(v);
    if (v !== 'product') setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const selectProduct = (id) => {
    setSelectedId(id);
    setView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const addToCart = (product, variant, qty) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.variant.size === variant.size && i.variant.tier === variant.tier);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, variant, qty }];
    });
  };
  
  const updateQty = (i, qty) => {
    if (qty <= 0) { setCart(cart.filter((_, j) => j !== i)); return; }
    setCart(cart.map((it, j) => j === i ? { ...it, qty } : it));
  };
  
  const removeFromCart = (i) => setCart(cart.filter((_, j) => j !== i));
  
  const checkout = () => {
    alert('🔒 Redirigiendo a Wompi…\n\nEn producción este botón genera un permalink de Shopify con los productos y abre el checkout de Wompi para completar el pago. Al confirmarse, Shopify crea el pedido NI-2026-XXXX y dispara el primer correo transaccional al cliente.');
  };
  
  const WA_NUMBER = '573173641851';
  
  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const cartWhatsApp = () => {
    const lines = cart.map(it => `• ${it.product.name}${it.product.inspiredBy ? ' ' + it.product.inspiredBy : ''} · ${it.variant.size} ${it.variant.tier} × ${it.qty}`).join('\n');
    const total = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
    const msg = `Hola Nova Import 👋\nQuiero hacer este pedido:\n\n${lines}\n\nTotal: ${fmt(total)}\n\n¿Me confirman disponibilidad y método de pago? Gracias.`;
    openWhatsApp(msg);
  };
  
  const productWhatsApp = (msg) => {
    openWhatsApp(msg);
  };
  
  const product = selectedId ? PRODUCTS.find(p => p.id === selectedId) : null;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  
  const renderView = () => {
    if (view === 'catalog') return <Catalog onSelectProduct={selectProduct} />;
    if (view === 'catalog-hombre') return <Catalog initialFilter={{ gender: 'Hombre' }} title="Fragancias para él" onSelectProduct={selectProduct} />;
    if (view === 'catalog-mujer') return <Catalog initialFilter={{ gender: 'Mujer' }} title="Fragancias para ella" onSelectProduct={selectProduct} />;
    if (view === 'catalog-arabe') return <Catalog initialFilter={{ type: 'arabe' }} title="Marcas árabes 100% originales" onSelectProduct={selectProduct} />;
    if (view === 'catalog-inspirado') return <Catalog initialFilter={{ type: 'inspirado' }} title="Esencias inspiradas premium" onSelectProduct={selectProduct} />;
    if (view === 'catalog-bestsellers') return <Catalog initialFilter={{ bestseller: true }} title="Los más vendidos" onSelectProduct={selectProduct} />;
    if (view === 'product' && product) return <ProductDetail product={product} onBack={() => navigate('catalog')} onAddToCart={addToCart} onWhatsAppBuy={productWhatsApp} onSelectProduct={selectProduct} />;
    if (view === 'track') return <TrackOrder />;
    if (view === 'maison') return <Maison />;
    if (view === 'admin') return <Admin />;
    if (view === 'account') return (
      <main className="bg-white min-h-screen flex items-center justify-center p-6 f-dm">
        <div className="text-center max-w-md space-y-5">
          <User size={36} style={{ color: C.orange }} className="mx-auto" strokeWidth={1.5} />
          <h1 className="f-archivo font-black text-3xl">Tu cuenta</h1>
          <p style={{ color: C.muted }}>Tu historial de pedidos se gestiona vía Shopify Customer Account. Si solo quieres rastrear un pedido, usa el seguimiento.</p>
          <button onClick={() => navigate('track')} className="text-white px-6 py-3 f-archivo font-bold text-sm" style={{ background: C.navy }}>SEGUIR UN PEDIDO</button>
        </div>
      </main>
    );
    return <Home onNavigate={navigate} onSelectProduct={selectProduct} />;
  };
  
  return (
    <div className="f-dm" style={{ background: 'white' }}>
      <Fonts />
      <Header onNavigate={navigate} currentView={view} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <div className="fade" key={view + (selectedId || '')}>
        {renderView()}
      </div>
      <Footer onNavigate={navigate} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={checkout}
        onWhatsApp={cartWhatsApp}
      />
      {cookies && <CookieBanner onClose={() => setCookies(false)} />}
      
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/573173641851?text=Hola%20Nova%20Import%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20perfumes"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-30 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Chat por WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </a>
      
      {/* Admin shortcut */}
      <button
        onClick={() => navigate('admin')}
        className="fixed bottom-24 left-6 z-30 bg-stone-900 text-white px-3 py-2 text-[10px] f-archivo font-bold tracking-wider opacity-60 hover:opacity-100"
      >
        ADMIN DEMO ↗
      </button>
    </div>
  );
}
