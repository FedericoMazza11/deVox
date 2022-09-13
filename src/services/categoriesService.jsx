import axios from "axios";

class CategoryServices {


  //GET / POST Voxes
  categoryFilter(category) {
    switch (true) {
      case category === 1: return ['ANM', 'Anime'];
      case category === 2: return ['ARTE', 'Arte'];
      case category === 3: return ['AUTO', 'Autos'];
      case category === 4: return ['BANT', 'International Random'];
      case category === 5: return ['CON', 'Consejos'];
      case category === 6: return ['CYTV', 'Cine y TV'];
      case category === 7: return ['DEPO', 'Deportes'];
      case category === 8: return ['DWNL', 'Descargas'];
      case category === 9: return ['ECO', 'Economia'];
      case category === 10: return ['FEM', 'Soy mujer'];
      case category === 11: return ['FIT', 'Fitness'];
      case category === 12: return ['GAS', 'Gastronomia'];
      case category === 13: return ['GEN', 'General'];
      case category === 14: return ['GMR', 'Gamer'];
      case category === 15: return ['GORE', 'Gore'];
      case category === 16: return ['GYM', 'Gimnasio'];
      case category === 17: return ['HIST', 'Historias'];
      case category === 18: return ['HIS', 'Historia'];
      case category === 19: return ['INT', 'Internacional'];
      case category === 20: return ['JIJO', 'Humor'];
      case category === 21: return ['LGBT', 'LGBT'];
      case category === 22: return ['NSFW', 'Pornografia'];
      case category === 23: return ['BDSM', 'Fetiches'];
      case category === 24: return ['OMNI', 'Omniverso'];
      case category === 25: return ['PARA', 'Paranormal'];
      case category === 26: return ['POL', 'Politica'];
      case category === 27: return ['PREG', 'Preguntas'];
      case category === 28: return ['PROG', 'Programacion'];
      case category === 29: return ['SCI', 'Ciencia'];
      case category === 30: return ['TECH', 'Tecnologia'];
      case category === 31: return ['UFF', 'Random'];
      case category === 32: return ['YTB', 'Youtube'];
      case category === 33: return ['HLT', 'Salud']
      case category === 34: return ['MUS', 'Musica']
      case category === 35: return ['NOT', 'Noticias']
      case category === 36: return ['NRM', 'Normies']
      case category === 37: return ['LIT', 'Literatura']
      case category === 38: return ['LUG', 'Lugares']
      case category === 39: return ['HUM', 'Humanidades']
      default: return ['NULL', 'Invalid'];
    }
  }
    categoryURLDecoder(category) {
      switch (true) {
        case category == 'ANM': return [1, 'Anime'];
        case category == 'ARTE': return [2, 'Arte'];
        case category === 'AUTO': return [3, 'Autos'];
        case category === 'BANT': return [4, 'International Random'];
        case category === 'CON': return [5, 'Consejos'];
        case category === 'CYTV': return [6, 'Cine y TV'];
        case category === 'DEPO': return [7, 'Deportes'];
        case category === 'DWNL': return [8, 'Descargas'];
        case category === 'ECO': return [9, 'Economia'];
        case category === 'FEM': return [10, 'Soy mujer'];
        case category === 'FIT': return [11, 'Fitness'];
        case category === 'GAS': return [12, 'Gastronomia'];
        case category === 'GEN': return [13, 'General'];
        case category === 'GMR': return [14, 'Gamer'];
        case category === 'GORE': return [15, 'Gore'];
        case category === 'GYM': return [16, 'Gimnasio'];
        case category === 'HIST': return [17, 'Historias'];
        case category === 'HIS': return [18, 'Historia'];
        case category === 'INT': return [19, 'Internacional'];
        case category === 'JIJO': return [20, 'Humor'];
        case category === 'LGBT': return [21, 'LGBT'];
        case category === 'NSFW': return [22, 'Pornografia'];
        case category === 'BDSM': return [23, 'Fetiches'];
        case category === 'OMNI': return [24, 'Omniverso'];
        case category === 'PARA': return [25, 'Paranormal'];
        case category === 'POL': return [26, 'Politica'];
        case category === 'PREG': return [27, 'Preguntas'];
        case category === 'PROG': return [28, 'Programacion'];
        case category === 'SCI': return [29, 'Ciencia'];
        case category === 'TECH': return [30, 'Tecnologia'];
        case category === 'UFF': return [31, 'Random'];
        case category === 'YTB': return [32, 'Youtube'];
        case category === 'HLT': return [33, 'Salud']
        case category === 'MUS': return [34, 'Musica']
        case category === 'NOT': return [35, 'Noticias']
        case category === 'NRM': return [36, 'Normies']
        case category === 'LIT': return [37, 'Literatura']
        case category === 'LUG': return [38, 'Lugares']
        case category === 'HUM': return [39, 'Humanidades']
        default: return [0, 'Invalid'];
      }
  }


}

const service = new CategoryServices();
export default service;
