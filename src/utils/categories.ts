import IconCleaning from '../img/icon_cleaning.svg';
import IconCloth from '../img/icon_washing_cloth.svg';
import IconCooking from '../img/icon_cooking.svg';
import IconDish from '../img/icon_washing_dish.svg';
import IconShopping from '../img/icon_shopping.svg';

type categoriesType = {
  [key: string]: {
    name: string,
    icon: string,
    formType: string,
    status: {
      [key: string]: {
        [key: string]: number
      }
    }
  }
}

const categories: categoriesType = {
  cooking: {
    name: '料理',
    icon: IconCooking,
    formType: 'radio',
    status: {
      is_done: {
        '作った': 1
      }
    }
  },
  dish: {
    name: '食器洗い',
    icon: IconDish,
    formType: 'radio',
    status: {
      is_put: {
        '入れた': 1,
        '入れてない': 0
      },
      is_done: {
        '回した': 1,
        '回してない': 0
      }
    }
  },
  cloth: {
    name: '洗濯物',
    icon: IconCloth,
    formType: 'radio',
    status: {
      is_put: {
        '入れた': 1,
        '入れてない': 0
      },
      is_done: {
        '回した': 1,
        '回してない': 0
      }
    }
  },
  cleaning: {
    name: '掃除',
    icon: IconCleaning,
    formType: 'select',
    status: {
      is_done: {
        '床': 1,
        'お風呂': 2,
        'トイレ': 3,
        '洗面所': 4,
        'キッチン': 5
      }
    }
  },
  shopping: {
    name: '買い物',
    icon: IconShopping,
    formType: 'radio',
    status: {
      is_done: {
        '買った': 1
      }
    }
  }
}

export default categories
