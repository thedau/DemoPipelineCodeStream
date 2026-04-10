pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
    DEPLOY_ENV = 'staging'
  }

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy Mock') {
      when {
        branch 'main'
      }
      steps {
        sh 'npm run deploy:mock'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/*.json', allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'reports/junit.xml'
    }
    success {
      echo 'CodeStream pipeline completed successfully.'
    }
    failure {
      echo 'CodeStream pipeline failed. Please inspect stages.'
    }
  }
}
