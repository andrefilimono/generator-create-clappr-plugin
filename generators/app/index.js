'use strict'
const Generator = require('yeoman-generator')
const pluginTypes = [
  'ContainerPlugin',
  'UIContainerPlugin',
  'CorePlugin',
  'UICorePlugin',
  'Playback'
]

function toLowerCase (string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

module.exports = class extends Generator {
  prompting () {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your plugin name (ex: clappr-events)'
    }, {
      type: 'input',
      name: 'className',
      message: 'Your class name (ex: ClapprEvents)'
    }, {
      type: 'list',
      name: 'type',
      message: 'Your plugin type',
      choices: pluginTypes
    }, {
      type: 'input',
      name: 'description',
      message: 'Your plugin description'
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Your name (ex: Alex Ivanov)'
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'Your email'
    }, {
      type: 'input',
      name: 'repository',
      message: 'Plugin repository URL'
    }]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  writing () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    )

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    )

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        repository: this.props.repository
      }
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        name: this.props.name,
        className: this.props.className
      }
    )

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {
        name: this.props.name,
        className: this.props.className,
        confName: toLowerCase(this.props.className)
      }
    )

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      {
        type: this.props.type,
        className: this.props.className
      }
    )

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name,
        className: this.props.className,
        description: this.props.description,
        confName: toLowerCase(this.props.className)
      }
    )
  }

  install () {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    })
  }
}
