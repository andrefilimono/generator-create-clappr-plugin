import { <%= type %> } from 'clappr'

class <%= className %> extends <%= type %> {
  get name () {
    return '<%= name %>'
  }

  static get version () {
    return VERSION // eslint-disable-line
  }
}

export default <%= className %>
