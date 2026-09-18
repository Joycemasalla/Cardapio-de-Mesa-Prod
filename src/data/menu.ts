export type MenuSize = { label: string; price: string };

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  sizes?: MenuSize[];
  note?: string;
  image?: string;
};

export type MenuGroup = { title?: string; items: MenuItem[] };

export type MenuCategory = {
  id: string;
  label: string;
  title: string;
  image: string;
  intro?: string;
  note?: string;
  groups: MenuGroup[];
};

export const RESTAURANT = {
  name: "Espaço Imperial",
  tagline: "Bar & Restaurante",
  intro: "Cardápio digital da sua mesa — deslize para folhear e toque em um item para ver os detalhes.",
};

export const categories: MenuCategory[] = [
  {
    id: "artesanais",
    label: "Artesanais",
    title: "Hambúrgueres Artesanais",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990068/cardapio-digital-images/kbukfzahedlithi28vdq.jpg",
    groups: [
      {
        items: [
          {
            name: "Cheddar MC Melt",
            description: "Pão brioche, bife artesanal de boi (120g), cheddar, cebola caramelizada.",
            price: "R$ 17,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990068/cardapio-digital-images/kbukfzahedlithi28vdq.jpg",
          },
          {
            name: "Chicken Burguer",
            description: "Pão brioche, bife artesanal de frango (120g), queijo prato, alface, tomate e molho especial.",
            price: "R$ 18,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756576823/cardapio-digital-images/edral2fahbs3crwpsgjk.jpg",
          },
          {
            name: "Crispy Bacon",
            description: "Pão brioche, bife artesanal de boi (120g), mussarela, bacon caramelizado, cebola crispy e molho especial.",
            price: "R$ 21,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1772215328/cardapio-digital-images/products/hpe9nflhs8konjuwzi8j.jpg",
          },
          {
            name: "Rei Bacon",
            description: "Pão brioche, bife artesanal de boi (120g), cheddar, bacon, muçarela, cebola caramelizada e barbecue.",
            price: "R$ 22,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753539518/cardapio-digital-images/wysxhcttujmcdrjxch6f.jpg",
          },
          {
            name: "Chicken Especial",
            description: "Pão brioche, bife frango empanado, cheddar, alface, tomate, anel de cebola e barbecue.",
            price: "R$ 23,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883400/cardapio-digital-images/lizkyrftbpb7rguso4m8.jpg",
          },
          {
            name: "Cheddar Melt Duplo",
            description: "Pão brioche, 2 bifes artesanais boi (120g), 2 fatias cheddar e cebola caramelizada.",
            price: "R$ 24,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756576117/cardapio-digital-images/t3maxgnprjyzqsfmjy5z.jpg",
          },
          {
            name: "Costela Burguer",
            description: "Pão brioche, costela desfiada, bife artesanal de boi (120g), muçarela, alface, anel de cebola, barbecue.",
            price: "R$ 24,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751899058/cardapio-digital-images/oc86btev0yx9gerewzbh.jpg",
          },
          {
            name: "San Melt",
            description: "Pão brioche, bife de boi (120g), catupiry empanado, bacon, geleia de pimenta",
            price: "R$ 26,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785009277/cardapio-digital-images/products/n15a3i3ctxrx67hdszzj.png",
          },
          {
            name: "Rib Burguer",
            description: "Pão brioche, 1 bife de boi (120g), 1 bife de costela empanada, muçarela, geleia de pimenta, barbecue",
            price: "R$ 27,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785595235/cardapio-digital-images/products/zwka5sdrddnatdgo7hyi.jpg",
          },
          {
            name: "Super Rei Bacon",
            description: "Pão brioche, 2 bife artesanal de boi (120g), 2 fatias de cheddar, bacon, tomate, cebola caramelizada e molho especial.",
            price: "R$ 27,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883340/cardapio-digital-images/u2h1yxwnzjroekhvaatc.jpg",
          },
          {
            name: "Pig Melt",
            description: "Pão de brioche, bife artesanal de lombo (150g), catupiry empanado, cheddar, tomate, alface, cebola caramelizada e barbecue.",
            price: "R$ 28,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990046/cardapio-digital-images/ybpsjjskqyaxzpq1sdf9.jpg",
          },
          {
            name: "Mini Burgues",
            description: "2 chicken burguer + 2 Rei bacon + cheddar mc melt",
            price: "R$ 50,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1772217057/cardapio-digital-images/products/ko4tjbcvpr0mebcexs1f.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "tradicionais",
    label: "Tradicionais",
    title: "Hambúrgueres Tradicionais",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062349/cardapio-digital-images/pwywlu6udipraobxxryz.jpg",
    groups: [
      {
        items: [
          {
            name: "Misto",
            description: "Pão de forma, presunto e muçarela.",
            price: "R$ 11,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062349/cardapio-digital-images/pwywlu6udipraobxxryz.jpg",
          },
          {
            name: "Hambúrguer",
            description: "Pão brioche, bife caseiro. Acompanha alface, milho, tomate e batata.",
            price: "R$ 13,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577019/cardapio-digital-images/puhgbhh84jffoa1zyj49.jpg",
          },
          {
            name: "X Burguer",
            description: "Pão brioche, bife caseiro, queijo. Acompanha alface, milho, tomate e batata.",
            price: "R$ 14,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756815024/cardapio-digital-images/kulvvw1acthblyrazw3t.jpg",
          },
          {
            name: "Bacon Burguer",
            description: "Pão brioche, bife caseiro, bacon. Acompanha alface, milho, tomate e batata.",
            price: "R$ 15,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577257/cardapio-digital-images/vsfsq2gngpgsev5sk7od.jpg",
          },
          {
            name: "X Bacon",
            description: "Pão brioche, bife caseiro, queijo, bacon. Acompanha alface, milho, tomate e batata.",
            price: "R$ 17,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756576451/cardapio-digital-images/jyaaptdlgjffkj5aeevn.jpg",
          },
          {
            name: "X Burguesunto",
            description: "Pão brioche, bife caseiro, presunto, queijo. Acompanha alface, milho, tomate e batata.",
            price: "R$ 17,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756815044/cardapio-digital-images/bfh03xbjzi4nhm5p6pxy.jpg",
          },
          {
            name: "X Calabresa",
            description: "Pão brioche, bife caseiro, calabresa, queijo. Acompanha alface, milho, tomate e batata.",
            price: "R$ 17,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756815064/cardapio-digital-images/mgpuedmnwopo0lrn1xea.jpg",
          },
          {
            name: "X Egg",
            description: "Pão brioche, bife caseiro, ovo, queijo. Acompanha alface, milho, tomate e batata.",
            price: "R$ 17,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756815086/cardapio-digital-images/retgmoehsuqqplh3pb7n.jpg",
          },
          {
            name: "Americano",
            description: "Pão brioche, bife caseiro, ovo, queijo, bacon. Acompanha alface, milho, tomate e batata.",
            price: "R$ 18,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756576165/cardapio-digital-images/va7pk7w4oj0xvvu2a2vq.jpg",
          },
          {
            name: "FranBacon",
            description: "Pão brioche, bife de frango caseiro, bacon, queijo e catupiry. Acompanha alface, milho, tomate e batata.",
            price: "R$ 18,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756576239/cardapio-digital-images/d07f9jc5vsz3trqlxcjx.jpg",
          },
          {
            name: "X Tudo",
            description: "Pão brioche, bife caseiro, ovo, presunto, queijo, bacon. Acompanha alface, milho, tomate e batata.",
            price: "R$ 21,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883446/cardapio-digital-images/gnmxariy70iqhek01jlq.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas",
    title: "Pizzas Salgadas",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381321/cardapio-digital-images/wr5j7mtyj6b9qjmuxtlc.jpg",
    groups: [
      {
        items: [
          {
            name: "Pizza A Moda",
            description: "Muçarela, presunto, calabresa, palmito, azeitona, milho, cebola, catupiry e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381321/cardapio-digital-images/wr5j7mtyj6b9qjmuxtlc.jpg",
          },
          {
            name: "Pizza Americana",
            description: "Muçarela, cheddar, tomate, pimentão, cream cheese, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381422/cardapio-digital-images/aor1ki9pjxdmmbxqoz2o.jpg",
          },
          {
            name: "Pizza Bacon",
            description: "Bacon, muçarela, tomate azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381509/cardapio-digital-images/bzeewqoz4giu1w006g9t.jpg",
          },
          {
            name: "Pizza Calabresa",
            description: "Calabresa, muçarela, cebola, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883504/cardapio-digital-images/st4bgqj41fhwa23t25o8.jpg",
          },
          {
            name: "Pizza Camarão",
            description: "Muçarela, camarão, catupiry alho frito, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751899100/cardapio-digital-images/nqsziumwawfzvr9wczxi.jpg",
          },
          {
            name: "Pizza Carne Seca",
            description: "Muçarela, carne seca, catupiry cebola, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883540/cardapio-digital-images/evgagksdzyjfq0he2evk.jpg",
          },
          {
            name: "Pizza Costela",
            description: "Muçarela, costela, catupiry cebola, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381581/cardapio-digital-images/fth1oejkwavmk8segpvw.jpg",
          },
          {
            name: "Pizza Da Roça",
            description: "Muçarela, frango desfiado, milho Bacon, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381719/cardapio-digital-images/bgwz4czc7vlzynaxmbzu.jpg",
          },
          {
            name: "Pizza Frango com Catupiry",
            description: "Muçarela, frango desfiado, catupiry, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538337/cardapio-digital-images/etiykagvzhq4mcd87aub.jpg",
          },
          {
            name: "Pizza Italiana",
            description: "Muçarela, salaminho, azeitona, cebola e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538129/cardapio-digital-images/alipg2ejtddwas7dzg08.jpg",
          },
          {
            name: "Pizza Lombo",
            description: "Muçarela, lombo canadense, catupiry azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755381793/cardapio-digital-images/kc1ohablbqsivxeo9kyw.jpg",
          },
          {
            name: "Pizza Margherita",
            description: "Muçarela, tomate, parmesão, manjericão, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753214129/cardapio-digital-images/d5nqwzfnfleeapi3zmzy.jpg",
          },
          {
            name: "Pizza Palmito",
            description: "Muçarela, palmito, catupiry azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753214077/cardapio-digital-images/yw3mqyqtcdmevqcgzxuo.jpg",
          },
          {
            name: "Pizza Portuguesa",
            description: "Muçarela, calabresa, tomate, pimentão, presunto, ovo, cebola, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990097/cardapio-digital-images/tfpgmmehimkbuz9kv0tb.jpg",
          },
          {
            name: "Pizza Presunto",
            description: "Presunto, Muçarela, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538157/cardapio-digital-images/y0ahb4ijm3vpfa6peall.jpg",
          },
          {
            name: "Pizza Quatro Queijos",
            description: "Muçarela, Cheddar, catupiry, parmesão, azeitona e orégano.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753193853/cardapio-digital-images/tj2r9vtk3xapu5da0m5s.jpg",
          },
          {
            name: "Pizza Filé com Fritas",
            description: "Muçarela, contra filé, fritas, cebola, azeitona e orégano",
            sizes: [{ label: "Grande", price: "R$ 100,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785009390/cardapio-digital-images/products/fmpdsmf4dxd85uqlog89.png",
          },
        ],
      },
    ],
  },
  {
    id: "pizzas-doces",
    label: "Pizzas Doces",
    title: "Pizzas Doces",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538179/cardapio-digital-images/sewpurnqhyvqja8vegxn.jpg",
    groups: [
      {
        items: [
          {
            name: "Pizza Banana com Doce de Leite",
            description: "Muçarela, banana, doce de leite e canela.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538179/cardapio-digital-images/sewpurnqhyvqja8vegxn.jpg",
          },
          {
            name: "Pizza Creme de Avelã com Confete",
            description: "Muçarela, creme de avelã e confete.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753538214/cardapio-digital-images/mckntj8dfoj3wjlmzlfd.jpg",
          },
          {
            name: "Pizza Prestígio",
            description: "Muçarela, brigadeiro e coco.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883176/cardapio-digital-images/umhbmlanibq16s995gsm.jpg",
          },
          {
            name: "Pizza Romeu e Julieta",
            description: "Muçarela, requeijão cremoso e goiabada.",
            sizes: [{ label: "Pequena", price: "R$ 42,00" }, { label: "Média", price: "R$ 48,00" }, { label: "Grande", price: "R$ 53,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883286/cardapio-digital-images/vhiimsowmkgifpdjiai6.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "porcoes",
    label: "Porções",
    title: "Porções",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577398/cardapio-digital-images/whkc64upshzximitwxwu.jpg",
    groups: [
      {
        items: [
          {
            name: "Linguiça (Unid)",
            description: "Linguiça suculenta, perfeita para acompanhar outros pratos. Acompanhada de farofa.",
            price: "R$ 5,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577398/cardapio-digital-images/whkc64upshzximitwxwu.jpg",
          },
          {
            name: "Pão de Alho",
            description: "Pão de alho caseiro, crocante por fora e macio por dentro, acompanhado de farofa.",
            price: "R$ 7,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752195085/cardapio-digital-images/djsgrewv2g5dmoayfyry.jpg",
          },
          {
            name: "Batata",
            description: "Porção generosa de batatas fritas crocantes.",
            price: "R$ 20,00",
            image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          {
            name: "Mandioca Frita",
            description: "Porção de mandioca frita, crocante por fora e macia por dentro.",
            price: "R$ 20,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194672/cardapio-digital-images/w0ekein6bmgaizlncxdn.jpg",
          },
          {
            name: "Porção de Salgadinho",
            description: "Variedade de salgadinhos fritos.",
            price: "R$ 20,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990252/cardapio-digital-images/vpvdypzsp8en2vonlork.jpg",
          },
          {
            name: "Salaminho",
            description: "Porção de salaminho fatiado.",
            price: "R$ 20,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194779/cardapio-digital-images/ivd2cjzxaboa4xvyvetj.jpg",
          },
          {
            name: "Torresmo",
            description: "Torresmo crocante e saboroso.",
            price: "R$ 20,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194793/cardapio-digital-images/icsrnhid61e3dxthgzmd.jpg",
          },
          {
            name: "Batata c/ Queijo",
            description: "Batatas fritas cobertas com delicioso queijo derretido.",
            price: "R$ 25,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751986998/cardapio-digital-images/yca7asxds4vefscii1wm.jpg",
          },
          {
            name: "Bucho à Milanesa",
            description: "Bucho preparado à milanesa, crocante e saboroso.",
            price: "R$ 25,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194268/cardapio-digital-images/flyqau0ot1eolbslznsa.jpg",
          },
          {
            name: "Jiló Frito Especial",
            description: "Jiló frito crocante e temperado.",
            price: "R$ 25,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194519/cardapio-digital-images/nm0lfcbplxrhf43gcfp5.jpg",
          },
          {
            name: "Batata c/ Queijo e Bacon",
            description: "Batatas fritas com queijo derretido e crocante bacon.",
            price: "R$ 30,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194210/cardapio-digital-images/pdwpzkyzpgud6hnwly2z.jpg",
          },
          {
            name: "Batata c/ Queijo e Calabresa",
            description: "Batatas fritas com queijo e calabresa fatiada.",
            price: "R$ 30,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755385648/cardapio-digital-images/mxl0ae528qvr7wltpfkt.jpg",
          },
          {
            name: "Calabresa Acebolada",
            description: "Calabresa fatiada e refogada com cebola.",
            price: "R$ 30,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194318/cardapio-digital-images/ukumpb7vhafiszf3xqoa.jpg",
          },
          {
            name: "Frango a passarinho",
            description: "Frango frito a passarinho, temperado e crocante.",
            price: "R$ 30,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194473/cardapio-digital-images/w3vlls9gsq9qddhoazv7.jpg",
          },
          {
            name: "Batata c/ Cheddar, Bacon e Calabresa",
            description: "Batatas fritas com cheddar cremoso, bacon e calabresa.",
            price: "R$ 35,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752071843/cardapio-digital-images/keowhvysha9p9f8sirko.jpg",
          },
          {
            name: "Isca de Frango",
            description: "Suculentas iscas de peito de frango empanadas e fritas.",
            price: "R$ 35,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1772393035/cardapio-digital-images/products/oybodixmx9sxilhbcyep.jpg",
          },
          {
            name: "Linguiça com Mandioca",
            description: "Linguiça grelhada acompanhada de mandioca cozida.",
            price: "R$ 35,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577167/cardapio-digital-images/aopxsoxybwjl6i0exocb.jpg",
          },
          {
            name: "Torresmo com Mandioca",
            description: "Torresmo crocante servido com mandioca cozida.",
            price: "R$ 35,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194825/cardapio-digital-images/ifmkb4fspxrppp1mewkw.jpg",
          },
          {
            name: "Torresmo de Rolo c/ Geleia de Abacaxi",
            description: "Torresmo de rolo crocante servido com geleia agridoce de abacaxi.",
            price: "R$ 35,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753881601/cardapio-digital-images/abzk9hwdxeushanwa1iv.jpg",
          },
          {
            name: "Bolinho de Frango",
            description: "Frango catupiry tempero especiais farinha Panko",
            price: "R$ 40,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785010065/cardapio-digital-images/products/ccek6dzucwacyxg2k3nd.png",
          },
          {
            name: "Batata c/ Costela",
            description: "Batata Frita, Costela e Catupiry",
            price: "R$ 45,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1772216491/cardapio-digital-images/products/npqn4xoc61cowakpkps3.jpg",
          },
          {
            name: "Bolinho de Costela",
            description: "Costela desfiada e catupiry",
            price: "R$ 45,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1772216385/cardapio-digital-images/products/dxdpfzaois7bypybpljd.jpg",
          },
          {
            name: "Escondidinho de Carne Seca",
            description: "Delicioso escondidinho cremoso com carne seca desfiada.",
            price: "R$ 55,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194407/cardapio-digital-images/iewobv2o7qacqys1vp7l.jpg",
          },
          {
            name: "Filé de Tilápia",
            description: "Delicioso filé de tilápia empanado.",
            price: "R$ 55,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751986784/cardapio-digital-images/k1yc8ywgpvk3laeln67n.jpg",
          },
          {
            name: "Trio Mineiro",
            description: "Delicioso trio com o melhor da culinária mineira.",
            price: "R$ 55,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751990274/cardapio-digital-images/avvmvvkxefxrxxua3ppm.jpg",
          },
          {
            name: "Escondidinho de Camarão",
            description: "Mandioca cremosa, camarão e muçarela",
            price: "R$ 60,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785010159/cardapio-digital-images/products/f75k9j4ecwflpeqzmv6s.png",
          },
          {
            name: "Contra Filé com Fritas",
            description: "Suculento contra filé com porção de batatas fritas.",
            price: "R$ 75,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1751989998/cardapio-digital-images/gcppvlte1jvyrsmblfbd.jpg",
          },
          {
            name: "Filé de Tilápia c/ Fritas",
            description: "Delicioso filé de tilápia empanado acompanhado de uma porção de batatas fritas.",
            price: "R$ 80,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1755382203/cardapio-digital-images/zzrk1ijyhktl5b4vkbiu.jpg",
          },
          {
            name: "Picanha",
            description: "500g de picanha com farofa",
            price: "R$ 80,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785010215/cardapio-digital-images/products/xq8modknxodwho6aojnz.png",
          },
          {
            name: "Picanha (Porção)",
            description: "Generosa porção de picanha grelhada.",
            price: "R$ 80,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752194714/cardapio-digital-images/wmzquc5gnsfsvtzwg091.jpg",
          },
          {
            name: "Camarão Empanado",
            description: "400g Camarão empanado em farinha panko",
            price: "R$ 85,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1785010276/cardapio-digital-images/products/jwdep1ptf5bzqwfdf4wr.png",
          },
        ],
      },
    ],
  },
  {
    id: "baguete",
    label: "Baguete",
    title: "Baguetes",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577643/cardapio-digital-images/iannzafzzi353t947wxx.jpg",
    groups: [
      {
        items: [
          {
            name: "Baguete de Churrasco",
            description: "Pão francês, maionese de alho, churrasco e muçarela.",
            sizes: [{ label: "1 Espetinho de Boi", price: "R$ 16,00" }, { label: "2 Espetinhos de Boi", price: "R$ 23,00" }, { label: "1 Espetinho de Boi + Frango", price: "R$ 23,00" }, { label: "1 Espetinho de Frango", price: "R$ 16,00" }, { label: "2 Espetinhos de Frango", price: "R$ 23,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1756577643/cardapio-digital-images/iannzafzzi353t947wxx.jpg",
          },
          {
            name: "Baguete de Costela",
            description: "Pão francês, costela desfiada, cebola, catupiry e muçarela. ",
            price: "R$ 18,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753881894/cardapio-digital-images/tdi5n8hlmvpqoswbgdpi.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "chapas",
    label: "Chapas",
    title: "Chapas",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883112/cardapio-digital-images/nlgbiibolxwims7vjxzd.jpg",
    groups: [
      {
        items: [
          {
            name: "Chapa Mista [2 a 3 pessoas]",
            description: "Frango grelhado, contra filé, calabresa e batata frita.",
            price: "R$ 95,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883112/cardapio-digital-images/nlgbiibolxwims7vjxzd.jpg",
          },
          {
            name: "Especial da Casa [2 pessoas]",
            description: "300g de picanha, 200g mandioca na manteiga, 200g de batata frita.",
            price: "R$ 120,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883064/cardapio-digital-images/swjafvlbjowve2ltm4nd.jpg",
          },
          {
            name: "Especial da Casa [3 pessoas]",
            description: "500g de picanha, 200g mandioca na manteiga, 200g de batata frita.",
            price: "R$ 150,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1753883086/cardapio-digital-images/fprti847mkxxih86mo1g.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "picanha",
    label: "Picanha na Pedra",
    title: "Picanha na Pedra",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1770426273/cardapio-digital-images/products/gszyot28eledil5aqdrw.jpg",
    groups: [
      {
        items: [
          {
            name: "Picanha Simples [2 pessoas]",
            description: "Picanha (500g) + Farofa + Vinagrete",
            price: "R$ 120,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1770426273/cardapio-digital-images/products/gszyot28eledil5aqdrw.jpg",
          },
          {
            name: "Picanha Completa [2 pessoas]",
            description: "Picanha (500g) + Farofa + Vinagrete + Arroz + Batata frita",
            price: "R$ 130,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1770426296/cardapio-digital-images/products/loxbsl9dkfepwk74mlgv.jpg",
          },
          {
            name: "Picanha Simples [3 pessoas]",
            description: "Picanha (750g) + Farofa + Vinagrete",
            price: "R$ 150,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1770426286/cardapio-digital-images/products/hsqonqqse3rprelzkbnu.jpg",
          },
          {
            name: "Picanha Completa [3 pessoas]",
            description: "Picanha (750g) + Farofa + Vinagrete + Arroz + Batata frita",
            price: "R$ 180,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1770426313/cardapio-digital-images/products/jszepi9iofgynby0njdu.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    title: "Bebidas",
    image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752193897/cardapio-digital-images/lcttcrbbte7li50kwqle.jpg",
    groups: [
      {
        items: [
          {
            name: "Água c/ Gás",
            description: "Água mineral com gás.",
            price: "R$ 3,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752193897/cardapio-digital-images/lcttcrbbte7li50kwqle.jpg",
          },
          {
            name: "Água s/ Gás",
            description: "Água mineral sem gás.",
            price: "R$ 3,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752193396/cardapio-digital-images/w55c16xm8ip1woyqevdb.jpg",
          },
          {
            name: "Coca Cola Lata Zero",
            description: "Coca Cola zero lata 350ml",
            price: "R$ 8,00",
            image: "https://io.convertiez.com.br/m/drogaven/shop/products/images/393/medium/refrigerante-coca-cola-zero-lata-350ml_10884.jpg",
          },
          {
            name: "Coca-cola Lata",
            description: "Lata 350ml de Coca-Cola.",
            price: "R$ 8,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062795/cardapio-digital-images/fxnbfimyzankrj3uuda3.jpg",
          },
          {
            name: "Guaraná Antártica Zero",
            description: "Guaraná Antártica Zero 350ml",
            price: "R$ 8,00",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yLYgZUipLQnHBSKRMM23MP7agjuaAiP-Sw&s",
          },
          {
            name: "Guaraná Lata",
            description: "Lata 350ml de Guaraná.",
            price: "R$ 8,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752063037/cardapio-digital-images/au8nah9hvkhzarcvztb2.jpg",
          },
          {
            name: "H2O / Limoneto",
            description: "Bebida mista H2O sabor Limoneto.",
            sizes: [{ label: "Limoneto", price: "R$ 8,00" }, { label: "H2O", price: "R$ 8,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752063082/cardapio-digital-images/lvfzmuasywmjc9gago92.jpg",
          },
          {
            name: "Suco Natural",
            description: "Sabores: Laranja, Limão 300ml",
            sizes: [{ label: "Suco de Laranja 300ml", price: "R$ 9,00" }, { label: "Suco de Limão 300ml", price: "R$ 9,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752063372/cardapio-digital-images/vowjrenk7zxotstwl2b9.jpg",
          },
          {
            name: "Skol Beats Long Neck",
            description: "Bebida mista Skol Beats long neck ",
            sizes: [{ label: "Verde", price: "R$ 11,00" }, { label: "Vermelha", price: "R$ 11,00" }, { label: "Azul", price: "R$ 11,00" }],
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752193512/cardapio-digital-images/tvgjnhr1h0ucdmmdrs8u.jpg",
          },
          {
            name: "Coca-cola 1L",
            description: "Refrigerante Coca-Cola 1 litro.",
            price: "R$ 12,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062653/cardapio-digital-images/kdtktuzrlsv64trojsft.jpg",
          },
          {
            name: "Corona Long Neck",
            description: "Cerveja Corona long neck.",
            price: "R$ 12,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062860/cardapio-digital-images/kz4cnurdh1tco1projwk.jpg",
          },
          {
            name: "Guaraná 1L",
            description: "Refrigerante Guaraná 1 litro.",
            price: "R$ 12,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062926/cardapio-digital-images/lhq2kmbvdrwretx8rs4a.jpg",
          },
          {
            name: "Heineken Long Neck",
            description: "Cerveja Heineken long neck.",
            price: "R$ 12,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752063172/cardapio-digital-images/bayy7lkn1oguqgmmt8va.png",
          },
          {
            name: "Império Long Neck",
            description: "Cerveja Império long neck.",
            price: "R$ 12,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752193772/cardapio-digital-images/lf4jfycf9i2aj3mp5twq.jpg",
          },
          {
            name: "Chopp de Vinho Stempel",
            description: "Chopp De Vinho Stempel Red 600ml",
            price: "R$ 15,00",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nI1C49xYVwJ3JsS_kbA-G9pnk0GJcTtE5A&s",
          },
          {
            name: "Coca-Cola Zero 2L",
            description: "Refrigerante Zero Açúcar Coca-Cola Pet 2L",
            price: "R$ 15,00",
            image: "https://www.sondadelivery.com.br/img.aspx/sku/868957/530/7894900701517_0.png",
          },
          {
            name: "Coca-cola 2L",
            description: "Refrigerante Coca-Cola 2 litros.",
            price: "R$ 15,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752062702/cardapio-digital-images/oytmhfmpwlqxeryhauza.jpg",
          },
          {
            name: "Guaraná 2L",
            description: "Refrigerante Guaraná 2 litros.",
            price: "R$ 15,00",
            image: "https://res.cloudinary.com/dbes24whl/image/upload/v1752063000/cardapio-digital-images/ynvtzconecaumhddnc2p.jpg",
          },
        ],
      },
    ],
  },
];
