import artesanaisImg from "@/assets/artesanais.jpg";
import tradicionaisImg from "@/assets/tradicionais.jpg";
import pizzasImg from "@/assets/pizzas.jpg";
import porcoesImg from "@/assets/porcoes.jpg";
import bagueteImg from "@/assets/baguete.jpg";
import chapasImg from "@/assets/chapas.jpg";
import picanhaImg from "@/assets/picanha.jpg";
import bebidasImg from "@/assets/bebidas.jpg";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  sizes?: { label: string; price: string }[];
  note?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  title: string;
  image: string;
  intro?: string;
  note?: string;
  groups: { title?: string; items: MenuItem[] }[];
};

export const RESTAURANT = {
  name: "Espaço Imperial",
  tagline: "Bar & Restaurante",
  intro: "Cardápio digital da sua mesa — explore as categorias e toque em um item para ver os detalhes.",
};

export const categories: MenuCategory[] = [
  {
    id: "artesanais",
    label: "Artesanais",
    title: "Hambúrguer artesanais",
    image: artesanaisImg,
    intro: "Pão brioche, blend na chapa e combinações da casa.",
    groups: [
      {
        items: [
          { name: "Cheddar MC Melt", price: "R$ 17,00", description: "Pão brioche, bife de boi (120g), cheddar, cebola caramelizada" },
          { name: "Chicken Burguer", price: "R$ 18,00", description: "Pão brioche, bife de frango (120g), queijo prato, alface, tomate e molho especial" },
          { name: "Crispy Bacon", price: "R$ 21,00", description: "Pão brioche, bife de boi (120g), muçarela, bacon caramelizado, cebola crispy" },
          { name: "Rei Bacon", price: "R$ 22,00", description: "Pão brioche, bife de boi (120g), cheddar, muçarela, bacon, cebola caramelizada e barbecue" },
          { name: "Chicken Especial", price: "R$ 23,00", description: "Pão brioche, bife de frango empanado, cheddar, alface, tomate, anéis de cebola e barbecue" },
          { name: "Cheddar Melt Duplo", price: "R$ 24,00", description: "Pão brioche, 2 bife de boi (120g), 2 fatias de cheddar e cebola caramelizada" },
          { name: "Costela Burguer", price: "R$ 24,00", description: "Pão brioche, bife de boi (120g), costela desfiada, muçarela, anéis de cebola e barbecue" },
          { name: "San Melt", price: "R$ 26,00", description: "Pão brioche, bife de boi (120g), catupiry empanado, bacon, geleia de pimenta" },
          { name: "Super Rei Bacon", price: "R$ 27,00", description: "Pão brioche, 2 bife de boi (120g), 2 fatias de cheddar, bacon, tomate, cebola caramelizada, molho especial" },
          { name: "Rib Burguer", price: "R$ 27,00", description: "Pão brioche, 1 bife de boi (120g), 1 bife de costela empanada, muçarela, geleia de pimenta, barbecue" },
          { name: "Pig Melt", price: "R$ 28,00", description: "Pão brioche, bife de lombo (150g), catupiry empanado, cheddar, tomate, alface, cebola caramelizada, barbecue" },
        ],
      },
    ],
  },
  {
    id: "tradicionais",
    label: "Tradicionais",
    title: "Hambúrguer tradicionais",
    image: tradicionaisImg,
    note: "Todos os lanches tradicionais acompanham bife artesanal, milho, salada e batata palha.",
    groups: [
      {
        items: [
          { name: "Misto", price: "R$ 11,00", description: "Pão de forma, queijo e presunto" },
          { name: "Hambúrguer", price: "R$ 13,00", description: "Pão brioche, bife de boi" },
          { name: "X - Burguer", price: "R$ 14,00", description: "Pão brioche, bife de boi, muçarela" },
          { name: "Bacon Burguer", price: "R$ 15,00", description: "Pão brioche, bife de boi, bacon" },
          { name: "X - Egg", price: "R$ 17,00", description: "Pão brioche, bife de boi, queijo, ovo" },
          { name: "X - Burguersunto", price: "R$ 17,00", description: "Pão brioche, bife de boi, queijo, presunto" },
          { name: "X - Bacon", price: "R$ 17,00", description: "Pão brioche, bife de boi, queijo, bacon" },
          { name: "X - Calabresa", price: "R$ 17,00", description: "Pão brioche, bife de boi, calabresa, queijo" },
          { name: "Americano", price: "R$ 18,00", description: "Pão brioche, bife de boi, queijo, bacon, ovo" },
          { name: "FranBacon", price: "R$ 18,00", description: "Pão brioche, bife de frango, bacon, queijo, catupiry" },
          { name: "X - Tudo", price: "R$ 21,00", description: "Pão brioche, bife de boi, bacon, queijo, presunto, ovo" },
        ],
      },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas",
    title: "Pizzas",
    image: pizzasImg,
    intro: "Escolha o tamanho: P R$ 42,00 · M R$ 48,00 · G R$ 53,00",
    groups: [
      {
        title: "Salgadas",
        items: [
          { name: "Quatro Queijos", description: "Muçarela, cheddar, catupiry, parmesão, azeitona e orégano" },
          { name: "Bacon", description: "Muçarela, bacon, tomate, azeitona e orégano" },
          { name: "Calabresa", description: "Muçarela, calabresa, cebola, azeitona e orégano" },
          { name: "Camarão", description: "Muçarela, camarão, catupiry, alho frito, cebola, azeitona e orégano" },
          { name: "Carne Seca", description: "Muçarela, carne seca, catupiry, cebola, azeitona e orégano" },
          { name: "Costela", description: "Muçarela, costela, catupiry, cebola, azeitona e orégano" },
          { name: "Da Roça", description: "Muçarela, frango desfiado, milho, bacon, azeitona e orégano" },
          { name: "Presunto", description: "Muçarela, presunto, azeitona e orégano" },
          { name: "Frango c/ Catupiry", description: "Muçarela, frango desfiado, catupiry, azeitona e orégano" },
          { name: "Lombo", description: "Muçarela, lombo canadense, catupiry, azeitona e orégano" },
          { name: "Marguerita", description: "Muçarela, manjericão, parmesão, tomate, azeitona e orégano" },
          { name: "À Moda", description: "Muçarela, presunto, calabresa, palmito, milho, catupiry, cebola, azeitona e orégano" },
          { name: "Americana", description: "Muçarela, cheddar, tomate, pimentão, catupiry, azeitona e orégano" },
          { name: "Palmito", description: "Muçarela, palmito, catupiry, azeitona e orégano" },
          { name: "Portuguesa", description: "Muçarela, calabresa, presunto, tomate, pimentão, ovo, cebola, azeitona e orégano" },
          { name: "Italiana", description: "Muçarela, salaminho, cebola, azeitona e orégano" },
          {
            name: "File c/ Fritas",
            description: "Muçarela, contra filê, fritas, cebola, azeitona e orégano",
            price: "G — R$ 100,00",
            note: "Disponível apenas no tamanho G.",
          },
        ],
      },
      {
        title: "Pizzas doces",
        items: [
          { name: "Prestígio", description: "Muçarela, brigadeiro e coco" },
          { name: "Banana c/ Doce de leite", description: "Muçarela, banana, doce de leite e canela" },
          { name: "Creme de Avelã c/ Confete", description: "Muçarela, creme de avelã e confete" },
          { name: "Romeu e Julieta", description: "Muçarela, requeijão cremoso e goiabada" },
        ],
      },
    ],
  },
  {
    id: "porcoes",
    label: "Porções",
    title: "Porções",
    image: porcoesImg,
    intro: "Para dividir na mesa.",
    groups: [
      {
        items: [
          { name: "Mandioca Frita", price: "R$ 20,00" },
          { name: "Torresmo", price: "R$ 20,00" },
          { name: "Salaminho", price: "R$ 20,00" },
          { name: "Porção de Salgadinho", price: "R$ 20,00" },
          { name: "Batata Fritas", price: "R$ 20,00" },
          { name: "Bucho à Milanesa", price: "R$ 25,00" },
          { name: "Batata c/ Queijo", price: "R$ 25,00" },
          { name: "Jiló Frito Especial", price: "R$ 25,00" },
          { name: "Batata c/ Queijo e Bacon", price: "R$ 30,00" },
          { name: "Batata c/ Queijo e Calabresa", price: "R$ 30,00" },
          { name: "Frango a Passarinho", price: "R$ 30,00" },
          { name: "Calabresa Acebolada", price: "R$ 30,00" },
          { name: "Batata c/ cheddar, Bacon e Calabresa", price: "R$ 35,00" },
          { name: "Isca de Frango", price: "R$ 35,00" },
          { name: "Torresmo de rolo c/ Geleia de Abacaxi", price: "R$ 35,00" },
          { name: "Linguiça c/ Mandioca", price: "R$ 35,00" },
          { name: "Torresmo c/ Mandioca", price: "R$ 35,00" },
          { name: "Bolinho de Frango", price: "R$ 40,00" },
          { name: "Bolinho de Costela", price: "R$ 45,00" },
          { name: "Batata c/ Costela", price: "R$ 45,00" },
          { name: "Filé de Tilápia", price: "R$ 55,00" },
          { name: "Trio Mineiro", price: "R$ 55,00" },
          { name: "Escondidinho de Carne Seca", price: "R$ 55,00" },
          { name: "Escondidinho de Camarão", price: "R$ 60,00" },
          { name: "Contra Filé c/ Fritas", price: "R$ 75,00" },
          { name: "Filé de Tilápia c/ Fritas", price: "R$ 80,00" },
          { name: "Picanha", price: "R$ 80,00" },
          { name: "Camarão Empanado", price: "R$ 85,00" },
        ],
      },
    ],
  },
  {
    id: "baguete",
    label: "Baguete",
    title: "Baguete",
    image: bagueteImg,
    groups: [
      {
        items: [
          {
            name: "Baguete de Churrasco",
            description: "Pão francês, maionese de alho, churrasco, muçarela",
            sizes: [
              { label: "1 espetinho", price: "R$ 16,00" },
              { label: "2 espetinhos", price: "R$ 23,00" },
            ],
            note: "Adicional — R$ 2,00 cada: vinagrete | batata palha",
          },
          {
            name: "Baguete de Costela",
            description: "Pão francês, costela, cebola, catupiry, muçarela",
            price: "R$ 18,00",
            note: "Adicional — R$ 2,00 cada: vinagrete | batata palha | salada (alface e tomate) | cheddar | barbecue",
          },
        ],
      },
    ],
  },
  {
    id: "chapas",
    label: "Chapas",
    title: "Chapas",
    image: chapasImg,
    groups: [
      {
        items: [
          { name: "Chapa Mista", price: "R$ 95,00", description: "Frango grelhado, contrafilé, calabresa e batata frita", note: "2 a 3 pessoas" },
          { name: "Especial da casa", price: "R$ 120,00", description: "300g de picanha, 200g mandioca na manteiga, 200g de batata frita", note: "2 pessoas" },
          { name: "Especial da casa", price: "R$ 150,00", description: "500g de picanha, 200g mandioca na manteiga, 200g de batata frita", note: "3 pessoas" },
        ],
      },
    ],
  },
  {
    id: "picanha",
    label: "Picanha na Pedra",
    title: "Picanha na pedra",
    image: picanhaImg,
    groups: [
      {
        title: "Simples",
        items: [
          { name: "Picanha + Farofa + Vinagrete", price: "R$ 120,00", note: "2 pessoas (500g)" },
          { name: "Picanha + Farofa + Vinagrete", price: "R$ 150,00", note: "3 pessoas (750g)" },
        ],
      },
      {
        title: "Completa",
        items: [
          { name: "Picanha + Farofa + Vinagrete + Arroz + Batata frita", price: "R$ 130,00", note: "2 pessoas (500g)" },
          { name: "Picanha + Farofa + Vinagrete + Arroz + Batata frita", price: "R$ 180,00", note: "3 pessoas (750g)" },
        ],
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    title: "Bebidas",
    image: bebidasImg,
    note: "Consulte os valores das bebidas com a nossa equipe.",
    groups: [
      {
        title: "Sem álcool",
        items: [
          { name: "Coca-Cola 2L" },
          { name: "Guaraná 2L" },
          { name: "Coca-Cola 1L" },
          { name: "Guaraná 1L" },
          { name: "Coca-Cola Lata" },
          { name: "Guaraná Lata" },
          { name: "Água c/ Gás" },
          { name: "Água s/ Gás" },
          { name: "H2O / Limoneto" },
          { name: "Suco Natural", description: "Laranja, limão" },
          { name: "Suco de Polpa", description: "Abacaxi, abacaxi c/ hortelã, morango, graviola, acerola" },
        ],
      },
      {
        title: "Com álcool",
        items: [
          { name: "Brahma 600ml" },
          { name: "Skol 600ml" },
          { name: "Heineken 600ml" },
          { name: "Original 600ml" },
          { name: "Amstel 600ml" },
          { name: "Sparten 600ml" },
          { name: "Heineken long neck" },
          { name: "Estela long neck" },
          { name: "Corona long neck" },
          { name: "Skol beats long neck" },
        ],
      },
    ],
  },
];
