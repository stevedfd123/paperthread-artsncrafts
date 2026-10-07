// Generates src/products.generated.ts from the PaperThreads Google Drive "Products" folder.
// Image IDs were pulled from Drive; the folder is shared "anyone with the link can view",
// so the thumbnail endpoint below serves them directly to the browser.
import fs from 'fs';
import path from 'path';

const DRIVE_FOLDER = '1tzd3vjqnS64uajssLgbIPCOZfy5PTYv2';

const ART_COLLECTIONS = [
  {
    slug: 'mandalas',
    label: 'Mandalas',
    item: 'Mandala Art',
    description:
      'A hand-drawn mandala built from intricate radial linework, inked slowly and symmetrically over many hours.',
    ids: [
      '1rhiJ6boRpYdzU54tKzof7qe783T54wBy', '1tVvIOsgP8n1p3264AB5haihBpXbdU70k',
      '1sjdbvyJoiJQ0KLkcCCG78Ro6C0_lIUUA', '1S166l1sxHgpOhIFD0gfUqm0fvHDR4M3f',
      '1EKjfctWAEiLhUKDoRlJW87wYFO6CaEC9', '1oJNUHED-54RHHSzmHDOPDSbaEvv-x37F',
      '19-if68scIKqVUpI0GWkAFOcodkOykKci', '1s0xA76qXUBsVNQYW9k2e-jhkF5DAA29S',
      '1fTB85yDfV9guaiNn-zHzQWU-0MDE1OeT', '1lEzK4M9SGXGezY85Trp3sBD8xd8n6oa-',
      '1b2AMDkIrD3_ZBt-bnSOEWBdnSiSH1Jyz', '1Kl4Fj-NqXnsDcwfi9bH_3G2FjhlybC6j',
      '1ih_08PnVa1rvV3J7qoqRgmvON9vcxA3E', '1ENp1ckSj8eh_TaOZQDKMIJCo9gtpOL-i',
      '18TkHEwUnHtzQJSt9I1n3UXEAL3SBUp9C', '1FxuwvEnWYg6WpDWLsyZLNiKAnFOmIR95',
      '10_e0X8EprVMl9C4nQf0MZCWVB85cqh8w',
    ],
  },
  {
    slug: 'wooden-mandalas',
    label: 'Wooden Mandalas',
    item: 'Wooden Mandala',
    description:
      'Mandala artistry hand-painted straight onto a wooden surface — a tactile, long-lasting statement piece.',
    ids: [
      '1lgE8R6wYoM9BsOt8luKaBUI5OwP5aXF9', '1FccpLf5xGMYA_dESesfGpTRpgN7DC2K0',
      '1Liu73jDr0LLRlCMIeeqPXS1wB_QF4QFs',
    ],
  },
  {
    slug: 'figure-drawings',
    label: 'Figure Drawings',
    item: 'Figure Study',
    description:
      'A hand-drawn figure study capturing posture, proportion and quiet character in confident strokes.',
    ids: [
      '1S_oup_r3BteTHaWAw9miuERiAUxmGpR5', '1bFS6wxmmDGues_giy4kyPMl3-0DMHbsE',
      '1Zbvlg01Tvd1njQE4mMNXb2rI8vHDFqzN', '1Tzuf7dnNWi_UEFnIlls7d8fgGyw54YAI',
      '11B_Beljg8bttiDOyxjpSMxov2SLt1Dgs', '1JJxUHm2wdaMNpUJ5yo-agr2JVzUV6AVR',
      '1ToUqeqEljZkdArQojZYZwu3CjqLKCIep', '1KCuHoWM6614t1ly2jOP_tz_AyOVkU8qh',
      '1kx3-jlAQHdii30ZAKiijZakIAyZSDAmm', '1GQeYxrdpsxzOyNKmmcqewWRXlLVHLSYm',
      '1iGTxxeiGK2JkXX64qJ_5rorBCawQIz20', '1pydFpW2oFzqgpBKUkaE9dWRJDpC-8C1w',
      '1sekdhnuZOi0UcNa2RAGWYbsEr1SMbGck',
    ],
  },
  {
    slug: 'animal-drawings',
    label: 'Animal Drawings',
    item: 'Animal Portrait',
    description:
      'A detailed hand-drawn animal portrait, rendered from your own reference photo with careful attention to texture and expression.',
    ids: [
      '1RMl-TC3zC-pAb4bgQOuZ-R_vN6XV0gN8', '18wB3tcadXPzmoZ2sWY6WLHvIgLf4rKTX',
      '1ENSHbkCGYk2KhRgaCRO6lQfTbq1md9VS', '1WAOh6F5FOsEifn1nuiE27emn5523lCp7',
      '1xQgeFf7rN3i2Ydx73nCKa4Ft6xkh6ww5', '1jp5TFAc71iPpHdTeIhLur1kmLqxmd0F3',
      '1CHCW2sZRopETxYbTA79R8n1Ffc56jjwy', '1-06ymdFn7uBN2JOeqHChJpHY-V9lebhE',
      '1xvgZMK4s2ZDWXX7zRWE6DZaCXXVzsJ-B', '1puIomGatKw81URinr2OJV5Al6m4FhoiY',
      '1GKIAb--E6rc8rQGPoJ61OO_FLHcgRmXh', '1q13dycAzu8e6tYNF3644DQWEK2cr2vFv',
      '1YVr7E_gX6bsE2Vx8XCgJzFobYifpx2Aq', '1ETudJht1eNWrQQnG-Axtpx6Oi1yU-JHt',
      '1nyigSDaDSbPyDmrkHw0cFldeADakhiFr', '1-rUuO-EEnCOx7PB7rwf6vTD9hA8W0EEr',
      '1MUhqvC99eWaZRQUPwaTtFL0khcwdAo_M', '1nARQSxpOFHYFTjQP4IFp3d5JldIorLYV',
      '1m5KJtyRPe6FX3PqPid_wlDDhV7AUSTrP', '11VOqlioLKSSnBSoXyWPtjqWLMDfX8pOv',
      '1g3wn7cYkwd7XE04D-9yqAaMN-bb2ohdw', '1qbGBUO00SHB9U_qi6qieN_RH-Upbeyu7',
      '1qaTv4zQ5zs6HRbv8-TNpdKFSse7Q0WFQ', '1TKJ8Adjl0-O8rnWWuoAb9q467kzbjjRj',
      '1Xs4nhMBem8RoQAEfXp51kmnLO1LDApAd', '1lRt-6dw6RXJQ4EmeByuSmrrz3hXPKpWJ',
      '13Q9YH2mS7ESJUppgnGDNRLLh5jNrIsci', '1SPl2lnfhIaM6OVjeoNBR0koEYU7hIQfV',
      '1lNeNf-TXuJG4NuYsFkisylnCfP7T6Rd-', '1_OjmOmfsJhAS-_znYXexa0eFWxEntJvx',
      '1bRlTDfQxzzRjfVpOkwDHKoHmapd8Hb6p', '1gkaFQ27a2x_KBR3Jxk1AQgaSRc4LL3Dy',
      '1Kngw9GaiNg-RxQPsuoSbqQXQzsgYl64D',
    ],
  },
  {
    slug: 'painted-shoes',
    label: 'Painted Shoes',
    item: 'Hand-Painted Pair',
    description:
      'Custom artwork hand-painted directly onto footwear — wearable, completely one-of-a-kind art.',
    ids: [
      '1VvhW1-UivhRo3duTCK0TadPxOYC3O4yK', '1dGqx6tqvWH-7KZ1f00nKny0dlKS6HyVo',
      '1Qssnr04WHzwqgQ16iAJT40f4KVbMfRNv', '1yK8XvPyQ1uQBHEShs59cqwQt5ghgMwNb',
      '1TaIfvscchHDRVfnXtvvGCLT5vyOmJqjO',
    ],
  },
  {
    slug: 'occasion-art',
    label: 'Occasion Art',
    item: 'Occasion Piece',
    description:
      'A bespoke artwork created to mark one specific occasion — designed around your names, dates and colours.',
    ids: [
      '1jTxJh4Gitxd-zcKYVTyz5nrVKxmbzfAf', '1LWpu8mGLUQ5_bwoYpwvfHnolmYjr-AOx',
      '1As_PKsoQYMWtEyU7sQW2VPGV6boFmzHM', '1LYkCP_gp0H_BF8F9nc1v0c7hnUaQxUOI',
      '1OteUMokCuXooeJwrs6_wO3nzc90kFpaP', '1f759oI5oBZcPliFwv44DjwmMdij_ymX5',
      '1jEMCNwKXUZNVx8Q59gwioUL6jQ4gkhjI', '1EL6Uq9O3OGoCo-2beTcvcs04-B0irvTP',
      '1VON_Epjj_K7KnoNLC3IlFOYc10ePemOI',
    ],
  },
  {
    slug: 'wedding-fingerprint-tree',
    label: 'Wedding Fingerprint Trees',
    item: 'Fingerprint Tree',
    description:
      'A guest-participation keepsake: every guest presses a fingerprint that becomes a leaf on a hand-drawn tree.',
    ids: [
      '1zpKDQ2h3WvBgj6SiVF67SaSXDyyw0lCP', '1xu1ePYIXBnolyZrWZc5kCC5WjhdnP2JZ',
      '1Ol3Ev_FNJudZcBuReG0J1F2ErUjql3jx', '1UcCm18UBYSAcvkz0igehgaOtufzbSoWw',
      '1TUPf0mqnVSwsm3gwkbgVFCD-DRa6HQx0', '16ZFYg_usfPvqCir61Mq1SiT_xiovnJUC',
      '1FmtE0iTfoH90Pd3iWMC7Hmz-1H_1bqgQ', '1sEzmo3v5n6VX1bUwEe6OLT1BcWzacXaV',
    ],
  },
  {
    slug: 'wedding-guest-book',
    label: 'Wedding Guest Books',
    item: 'Guest Book',
    description:
      'A hand-illustrated guest book for your celebration, made to be signed on the day and treasured long after.',
    ids: ['1n5kqh-vdcHvDF_RoklHTqNMy1j40afZs'],
  },
  {
    slug: 'gender-reveal',
    label: 'Gender Reveal',
    item: 'Gender Reveal Piece',
    description:
      'A custom hand-made artwork built around the big announcement, in the palette of your choosing.',
    ids: [
      '1dBdE0QBkQwVA6sHdWPC8ddh70aYpfbDr', '1nVPeJiR753UwvIt79UWhJ3hfMbLLDdI3',
      '1lculGGYLBWpj9K8YjsSs3m2jC_ErOmwy',
    ],
  },
  {
    slug: 'workshops',
    label: 'Workshops',
    item: 'Workshop Moment',
    description:
      'From the PaperThreads workshops — hands-on sessions teaching drawing, quilling and paper-craft technique.',
    ids: [
      '1-vjUiHRBwsurUgYZMoZrqMh6rWPdP4fy', '1he4H4QQAuJ3-mAP51eE4dz9kdwxr-QZj',
      '165Teq9UT1lm12kD207UhWkjF4RIrHeaG', '1qpWSWOAxz6JiXtCPLhSLYlxlMFoWtt7y',
      '1Ai53XRGlZzFy6AVKzaK6RtLr1z9R6aa9', '1sTHotONm0-ak5zWGJSEEGFrBNcuvRSQf',
      '1glpGGjlJQbjrW6J6VY-qxnDGdXD9mkrr', '1KtlLkVkJUgaibEe1BXIT1vlprpeV6jaq',
    ],
  },
];

const CRAFT_COLLECTIONS = [
  {
    slug: 'greeting-cards',
    label: 'Greeting Cards',
    item: 'Greeting Card',
    description:
      'A handmade greeting card, personalised for the occasion with hand-cut paper and hand-written detail.',
    ids: [
      '1IFSxNN5GvRZ_Hpxi_nrRm-dG5RZ6Duac', '1Ys1afph2XId99-dGNyPM49egtHj0iG8L',
      '1IC8uqVJOHwAI8zEybBQc78cjEzQX1CGx', '1pk83uTrutcOJN9dXhXECq7gcPRlvUQMW',
      '1dvNt3dfO2S-2okYGe69eD_ce1ptjgGTk', '1FZ_yfz0Mdjqs96njHwatX9-XEjeWCWS1',
      '1NUlWhrOAOBFH3b5xjboK3Ksrigjj3arD', '15A69Ju0HKf8w1naonjg16O3KaLRMRhnZ',
      '1-wctECTq5BYjcLvRPgQVMVE1lEoWFXp0', '1V9VBErtTXBxTcJTFIdY2Tymze-zz4Jiy',
      '1YuxvY5tkaZPeO_KXZFpjk5XTyn52ktTn',
    ],
  },
  {
    slug: 'seasonal-cards',
    label: 'Seasonal Cards',
    item: 'Seasonal Card',
    description:
      'A handmade card celebrating the colours and warmth of the season, from festive reds to soft spring pastels.',
    ids: [
      '1EdMLDefkFGkUdHFPEsAeHQq_uB98Gv09', '1FdMeiHFP2FbsV_JHhqouMLALzGuMeX9L',
      '1S1mylSSotSR3zRpbbHyCH6bCvgPQDIIy', '15HgChXaM9yLa9ncErIonKiphXxuIVpjh',
      '1vuvJ2AQizCr8NfDq6FLLDB0qvvapqPLV', '1CS9UtGTmQnMJO-SamvprkCU4I6QN5joE',
      '1YnQZPiIWBtIvaF6y8AFAUPj3zg6pOd7S',
    ],
  },
  {
    slug: 'twisted-popout-cards',
    label: 'Twisted & Pop-Out Cards',
    item: 'Pop-Out Card',
    description:
      'An interactive card that twists and pops open into a layered paper scene — engineered as much as it is drawn.',
    ids: [
      '1KJcqcE_1RDqxq3RdS0pIyubuiLskkpJQ', '1njCyXI9waw0qmz7B57etRt5zBEvdQHWu',
      '1HVcfE9Q55qjmpTreyIY0lPVSvUXErniD', '17WhKdVN17moRr2yOQ6PyR-9GKxUzqG8Q',
      '1OLSQoNNFDUYrs0IT2klpAMd92b-NoRBa', '1Y2HJZPUjfwB8Vq8EiPHHxhRWFW971SiI',
      '1TQyNLPdobHCqDddJLUDQr-lbjgjy7R3B', '1S5Z3kwGwUdW5xO0La__vz8nat0uNXXeT',
      '1NIQRcquSShujzaaUhU_YR9NwGDa-hQUC', '108Dpx55w64U1d3fk5Sl0y0_9Mre2yfBF',
      '12N5sfk4VAGc8WSsCJalze_DbeEdnFYQA', '1PBO8-F0ueIP-0Di2gH7d34ta5pLebwtX',
      '1xFi_0ZlMpT6Iqb0b1bMM75DebVyPiD4u', '1Ra6Xl_DjU7DGLLaI3X2-RlexnVaKIluH',
      '1pImST5Ill6Xv5K64pCOZBCQp-_BECkjd',
    ],
  },
  {
    slug: 'exploding-boxes',
    label: 'Exploding Boxes',
    item: 'Exploding Box',
    description:
      'A multi-tier box that opens outward into photos, hidden messages and layered paper detail.',
    ids: [
      '12jVGIv6ohXMkvoS4II6h18n1iy1e0zxP', '189dW9m5jzrGL1VaQRvYK1xlaZJ1e4qbR',
      '106eiu2HuQoAIZlL_2ZJmnYV05luzVng-', '1cU1gTCrK1UINaf5iDrPtQWVIHhndakJl',
      '1C9UUavYvW0zhwCUfLyQr6f5SvfM51RAp',
    ],
  },
  {
    slug: 'paper-bouquets',
    label: 'Paper Bouquets',
    item: 'Paper Bouquet',
    description:
      'A bouquet that never wilts — handcrafted paper blooms, shaped petal by petal and arranged to order.',
    ids: ['1R11SYD1tUjD_Cg0D5OTGbe2epaUhw0CO'],
  },
  {
    slug: 'calendars',
    label: 'Calendars',
    item: 'Handmade Calendar',
    description:
      'A handcrafted calendar, illustrated and assembled page by page so every month is its own small artwork.',
    ids: [
      '1ltYqNKo128ah2tCQZ247p7zmwwZ16HUJ', '100jCsuCXIeqbDMamSuvWgYNHO3gR_qSb',
      '1cUc0UM2-3BiH3VCv1Ci78BhjKDMauZC1', '17dk1eYKbhxY5UQ8a9ma0cK4c2hFnDX6v',
      '15mQQssZvQSqtrFjffBrT6Uek2fxDom8H', '1fwX1ZKFV3PGxEjL2G9FEtV9mcb9C0c4W',
      '120ggaWiOspbp7w09L2YD5lqqVele0xQR', '1sn0CFA3RGrv2PrC5torcKdWkZIa2mJdO',
      '1L4UuHDy3rkPvYzG94Xyhu4SDKrxbqESV', '1BZStvz6hBCxc1s3pOcXtFYdpBlUXflSs',
      '1ee1YTevzKRXnPkkQFzsQUJuLDyxfrwAz', '1sBOMNUrVW5nnVuLdHBozD1w7YwWlGun5',
      '1N0vtDMkzoOBwvKCqEt6LIYIS5JXN0n1W', '18T1K_OwWhKrglRDlM0s5MApn-zvcCaZf',
      '1PMgIMTtRiDtn5JC3Y8lxBnbbawt0ETUC', '1ZZPp8cMHOXauKR0Gd1_DMBjySPSJm9RC',
      '1O6zNE7l4pnK7F01xeicGx5Vk4A7Z3qPB', '1tdkrZW6IJBXj9jZS1pc5eHprDxSKyZ68',
      '1WkEQuZ3ahS5Q5iUuH6J8UGWrXArfW6mT', '14GbJd0cITdgI4bZ-4O_A4xbYJWn2amaR',
      '1ol5B7CSoM7xVQ_ISwFvahaw_bSlEIgQS',
    ],
  },
  {
    slug: 'photo-books',
    label: 'Photo Books',
    item: 'Photo Book',
    description:
      'A handmade photo book built to hold your memories in paper, thread and hand-trimmed mounts.',
    ids: [
      '13Rx_aMMGnyH1uywQLoWjxxmK2dI7MvUS', '1WcdHd3SR04zVeilQE87g6O9JckPsuqy7',
      '1LdPCL87142G3gBhEunzVH7AVv22JUMJv', '1TmfARCuMMjLQttBssFvu5xTwCI_UMLbi',
      '1LoJ8cZyTVXubTLKyyBjk0tmNqi43vRyO', '1_FOfPOfYI0Qrg-7jHa_EZuUwPN82A_mx',
      '1b7RIlV3w0ucQLSIrc-obAx8z_153yJg_', '1r9jLs2NK1yrcHH_npPeJxf5yJ4e8HIQt',
      '1QyIWKkwZHtf8pDx9OrhZx1ix-_z_36OJ', '1jxQP9lI07dYTMe2WMLJ-be9k_EsQcAQ3',
      '1JszlG1EICKw2djBmvcGJzgP4uog-VlzP', '1bEZgztmffpfOi3ooR9-pVDHhrURv9qMh',
      '1TDL-Mfe6k0ZQacXImD9BcFr8hSL1s8F1', '1vZ0kw6AQV_-c3xfW7GioNH7AjoIul3VK',
      '1hOvxVd0r46E6PPWE9K1pPiXeYATzkB7m', '160LkLoRLRc9KAkkr8CQ-7_s-fsFk6goY',
      '1Q-LPgyy-bsYCV-UnTyrtWejkVNRhahkC',
    ],
  },
  {
    slug: 'pocket-albums',
    label: 'Pocket Albums',
    item: 'Pocket Album',
    description:
      'A compact handmade album with tucked pockets and pull-out cards for photos and secret notes.',
    ids: [
      '11s4Of5ymOGxDDndjot3E_y0pe3A4bKrk', '1iPiQ933yFxwmqoCVJ8xVDvGrKUu2pPqx',
      '12dFwGbcFDwX0CbFiT41oofBcFlfB6wCl', '1gkmiHRUF6JVJzOra3LF7ceryiJewfH1L',
      '1k5G86Yuf05cxyWhEs7GsZZ1X5IPyRK-8', '1Vm594oBvlwiZHqP6VHn3zE4m57Izo8up',
      '1m8wGHNXNG4pGElVodgYKh3GzgHUlueOl', '13ruuZRckNqI8Uqq0IjhKso5-yfw5syPK',
      '16q3zCOtVbKp84pxomy0SGKnvvG3iG800',
    ],
  },
  {
    slug: 'framed-collection',
    label: 'Framed Collection',
    item: 'Framed Keepsake',
    description:
      'A finished, framed handcraft piece — mounted, glazed and ready to hang straight out of the box.',
    ids: [
      '1SeoY2ziDq1dka2e9rsEyCjVWwWoOsCL0', '19kdxqzX-0Sl7omvFo4B0FTOykxo4wEqU',
      '1C0LU_tQFXzIhoc3FyMv-uGlkPoSCMmvh', '133FYXW7Ki_Jv0tFCPva5-fOG1MHE4SuT',
      '11evcwubrV421DCxc3Mki0NCixvldxi5L', '1ZvABZQRGxv6XZk9vFVMQYGDYIFrWSvst',
      '197RzAiI-6R9m8LpSy_Ma1MX1LxRZpyGX', '1sky79GF5nH8fUHxcrKNTsmr4wmTQ-x1S',
      '13uUXJxue-QLb0JDWZ_BnTzSOJFRnMiL7',
    ],
  },
];

const img = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function buildItems(groups, kind) {
  const out = [];
  for (const g of groups) {
    g.ids.forEach((id, i) => {
      const entry = {
        id: `${kind}-${g.slug}-${i + 1}`,
        title: g.ids.length > 1 ? `${g.item} No. ${i + 1}` : g.item,
        category: g.slug,
        collection: g.label,
        description: g.description,
        image: img(id),
        driveId: id,
        priceEstimate: 'Price on request',
      };
      if (kind === 'art') entry.size = 'Custom sizes available';
      else entry.timeToMake = 'Made to order';
      out.push(entry);
    });
  }
  return out;
}

function serialise(items, keys) {
  return items
    .map((it) => {
      const body = keys
        .filter((k) => it[k] !== undefined)
        .map((k) => `    ${k}: ${q(it[k])},`)
        .join('\n');
      return `  {\n${body}\n  },`;
    })
    .join('\n');
}

const artworks = buildItems(ART_COLLECTIONS, 'art');
const craftworks = buildItems(CRAFT_COLLECTIONS, 'craft');

const collectionLine = (g) =>
  `  { slug: ${q(g.slug)}, label: ${q(g.label)}, count: ${g.ids.length} },`;

const file = `// AUTO-GENERATED by scripts/gen-products.mjs — do not edit by hand.
// Source: Google Drive "Products" folder
// https://drive.google.com/drive/folders/${DRIVE_FOLDER}
// ${artworks.length} artworks across ${ART_COLLECTIONS.length} collections,
// ${craftworks.length} craftworks across ${CRAFT_COLLECTIONS.length} collections.
import { Artwork, Craftwork, ProductCollection } from './types';

export const ART_COLLECTIONS: ProductCollection[] = [
${ART_COLLECTIONS.map(collectionLine).join('\n')}
];

export const CRAFT_COLLECTIONS: ProductCollection[] = [
${CRAFT_COLLECTIONS.map(collectionLine).join('\n')}
];

export const ARTWORKS: Artwork[] = [
${serialise(artworks, ['id', 'title', 'category', 'collection', 'description', 'image', 'driveId', 'size', 'priceEstimate'])}
];

export const CRAFTWORKS: Craftwork[] = [
${serialise(craftworks, ['id', 'title', 'category', 'collection', 'description', 'image', 'driveId', 'timeToMake', 'priceEstimate'])}
];
`;

const target = path.resolve('src/products.generated.ts');
fs.writeFileSync(target, file);
console.log(
  `Wrote ${target}: ${artworks.length} artworks / ${craftworks.length} craftworks`
);
