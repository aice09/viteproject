pipeline {
  agent any

  environment {
    NODE_HOME = tool name: 'NodeJS 20.16.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    PATH = "${NODE_HOME}/bin:${env.PATH}"
    DEPLOY_BASE = '/var/www'
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        script {
          def branch = env.BRANCH_NAME
          def target = (branch == 'main') ? 'production' : 'development'
          sh "rm -rf ${DEPLOY_BASE}/${target}/*"
          sh "cp -r dist/* ${DEPLOY_BASE}/${target}/"
        }
      }
    }

    stage('Notify') {
      steps {
        office365ConnectorSend message: "Deployed `${env.BRANCH_NAME}` to `${env.BRANCH_NAME == 'main' ? 'production' : 'development'}`", status: 'Success'
      }
    }
  }

  post {
    failure {
      office365ConnectorSend message: "Build failed for `${env.BRANCH_NAME}`", status: 'Failed'
    }
  }
}
