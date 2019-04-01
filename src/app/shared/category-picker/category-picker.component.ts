import { DbService } from './../../services/db.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

const EDITORIAL_SETTINGS = {
  claudio: {
    title: 'Cláudio Humberto',
    categories: '12,570',
  },
  politica: {
    title: 'Política',
    categories: '25,3074',
  },
  justica: {
    title: 'Justiça',
    categories: '27,3072',
  },
  brasil: {
    title: 'Brasil e Regiões',
    categories: '28,83808',
  },
  exteriores: {
    title: 'Exteriores',
    categories: '35,3071',
  },
  dinheiro: {
    title: 'Dinheiro',
    categories: '36,3070',
  },
  opiniao: {
    title: 'Opinião',
    categories: '26',
  },
  especiais: {
    title: 'Especiais',
    categories: '967,3077',
  },
  mulheres: {
    title: 'Mulheres',
    categories: '37',
  },
};

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss'],
})
export class CategoryPickerComponent implements OnInit {
  userCategories$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  userTags$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  categories = [
    {
      title: 'Cláudio Humberto',
      ids: [12, 570],
    },
    {
      title: 'Política',
      ids: [25, 3074],
    },
    {
      title: 'Justiça',
      ids: [27, 3072],
    },
    {
      title: 'Brasil e Regiões',
      ids: [28, 83808],
    },
    {
      title: 'Exteriores',
      ids: [35, 3071],
    },
    {
      title: 'Dinheiro',
      ids: [36, 3070],
    },
    {
      title: 'Opinião',
      ids: [26],
    },
    {
      title: 'Especiais',
      ids: [967, 3077],
    },
    {
      title: 'Mulheres',
      ids: [37],
    },
  ];
  tags = [
    {
      title: 'Alagoas',
      ids: [26387, 130, 445],
    },
    {
      title: 'Agronegócio',
      ids: [3167, 18423],
    },
    {
      title: 'Brasil',
      ids: [26617, 167],
    },
    {
      title: 'Brasília',
      ids: [27090, 590],
    },
    {
      title: 'Brexit',
      ids: [6185],
    },
    {
      title: 'Câmara dos Deputados',
      ids: [26057, 8829, 186],
    },
    {
      title: 'Carro',
      ids: [3775, 312],
    },
    {
      title: 'Ciência e Tecnologia',
      ids: [4478, 11888],
    },
    {
      title: 'Combustível',
      ids: [601],
    },
    {
      title: 'Concurso Público',
      ids: [5334],
    },
    {
      title: 'Corrupção',
      ids: [25811, 159, 371, 9208, 70440],
    },
    {
      title: 'Cultura',
      ids: [5478, 5383, 5878, 6291],
    },
    {
      title: 'Diário Motor',
      ids: [85513],
    },
    {
      title: 'Dinheiro',
      ids: [209, 879, 1338, 484],
    },
    {
      title: 'Direitos',
      ids: [2248, 8871, 971, 1994],
    },
    {
      title: 'Distrito Federal',
      ids: [8371, 228, 22935, 16538],
    },
    {
      title: 'Donald Trump',
      ids: [79],
    },
    {
      title: 'Economia',
      ids: [328, 84233, 16201],
    },
    {
      title: 'Educação',
      ids: [237, 2930, 14118, 1062, 10169, 2931, 5624, 7671],
    },
    {
      title: 'Empreendedorismo',
      ids: [3958, 8785],
    },
    {
      title: 'Emprego',
      ids: [348, 1986, 12624, 1069, 2085, 5825, 81952],
    },
    {
      title: 'Facebook',
      ids: [1475],
    },
    {
      title: 'Fake News',
      ids: [284],
    },
    {
      title: 'Google',
      ids: [6662],
    },
    {
      title: 'Governo',
      ids: [419, 2457],
    },
    {
      title: 'Indústria',
      ids: [249, 6620, 12697, 177],
    },
    {
      title: 'Inflação',
      ids: [104],
    },
    {
      title: 'Imposto de Renda',
      ids: [190, 22907],
    },
    {
      title: 'Jair Bolsonaro',
      ids: [1600, 747, 81157, 82675],
    },
    {
      title: 'Lava Jato',
      ids: [25874, 26040, 17893, 44, 209, 200],
    },
    {
      title: 'Lula',
      ids: [26124, 43, 481, 477],
    },
    {
      title: 'Minas Gerais',
      ids: [681],
    },
    {
      title: 'Mulheres',
      ids: [735],
    },
    {
      title: 'Mundo',
      ids: [2364],
    },
    {
      title: 'Negócios',
      ids: [8267],
    },
    {
      title: 'Poder em Números',
      ids: [5965],
    },
    {
      title: 'Polícia Federal',
      ids: [234],
    },
    {
      title: 'Porte da Armas',
      ids: [41503],
    },
    {
      title: 'Previdência',
      ids: [25835, 3851, 1582, 1765],
    },
    {
      title: 'Rio de Janeiro',
      ids: [95, 6569],
    },
    {
      title: 'São Paulo',
      ids: [25823, 157, 9654],
    },
    {
      title: 'Saúde',
      ids: [144, 2508, 1047, 1200, 1755, 151],
    },
    {
      title: 'Senado',
      ids: [454, 278],
    },
    {
      title: 'Segurança',
      ids: [61, 689, 16266],
    },
    {
      title: 'Sérgio Moro',
      ids: [40],
    },
    {
      title: 'STF',
      ids: [25879, 45, 2368, 530],
    },
    {
      title: 'Transporte',
      ids: [28422, 4966],
    },
    {
      title: 'Venezuela',
      ids: [1383, 72],
    },
    {
      title: 'Viagens',
      ids: [813, 1602],
    },
  ];
  _ = _;

  constructor(private auth: AuthService, private db: DbService) {
    this.auth.user$.subscribe(user => {
      if (user) {
        const categories = user.categories || [];
        const tags = user.tags || [];
        this.userCategories$.next(categories);
        this.userTags$.next(tags);
      }
    });
  }

  ngOnInit() {}

  async toggleCategory(category) {
    const uid = await this.auth.uid();
    const userCategories = this.userCategories$.getValue();
    const newCategories = _.xor(userCategories, category.ids);
    return await this.db.updateAt(`/users/${uid}`, {
      categories: newCategories,
    });
  }

  async addAllCategories() {
    const uid = await this.auth.uid();
    const allCategories = _.flatten(
      this.categories.map(category => category.ids),
    );
    return await this.db.updateAt(`/users/${uid}`, {
      categories: allCategories,
    });
  }

  async toggleTag(tag) {
    const uid = await this.auth.uid();
    const userTags = this.userTags$.getValue();
    const newTags = _.xor(userTags, tag.ids);
    return await this.db.updateAt(`/users/${uid}`, {
      tags: newTags,
    });
  }

  async addAllTags() {
    const uid = await this.auth.uid();
    const allTags = _.flatten(this.tags.map(tag => tag.ids));
    return await this.db.updateAt(`/users/${uid}`, {
      tags: allTags,
    });
  }
}
