pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: "v1"
                kind: "Pod"
                metadata:
                  annotations:
                    devops.kmontocam.com: "true"
                    devops.kmontocam.com/cicd: "true"
                    devops.kmontocam.com/service: jenkins
                    kmontocam.com/environment: prod
                  namespace: jenkins
                spec:
                  containers:
                  - args:
                    - "infinity"
                    command:
                    - "sleep"
                    image: "amazon/aws-cli"
                    imagePullPolicy: "Always"
                    name: "aws-cli"
                    resources:
                      limits:
                        cpu: 200m
                        memory: 250Mi
                      requests:
                        cpu: 100m
                        memory: 125Mi
                    securityContext:
                      privileged: true
                    tty: false
                    volumeMounts:
                    - mountPath: "/mnt/tectonic"
                      name: "volume-0"
                      readOnly: false
                    workingDir: "/home/jenkins/agent"
                  - args:
                    - "sleep infinity"
                    command:
                    - "/bin/sh"
                    - "-c"
                    image: "ghcr.io/kmontocam/rust/tectonic:0.15.0-bookworm"
                    imagePullPolicy: "Always"
                    name: "tectonic"
                    resources:
                      limits:
                        cpu: 500m
                        memory: 500Mi
                      requests:
                        cpu: 250m
                        memory: 250Mi
                    securityContext:
                      privileged: true
                    tty: false
                    volumeMounts:
                    - mountPath: "/mnt/tectonic"
                      name: "volume-0"
                      readOnly: false
                    workingDir: "/home/jenkins/agent"
                  - name: jnlp
                    resources:
                      limits:
                        cpu: 400m
                        memory: 1024Mi
                      requests:
                        cpu: 100m
                        memory: 256Mi
                  hostNetwork: false
                  nodeSelector:
                    kubernetes.io/os: linux
                  restartPolicy: "Never"
                  volumes:
                  - emptyDir:
                      medium: ""
                    name: "volume-0"
                '''
        }
    }
    stages {
        stage('LATEX COMPILATION') {
            steps {
                  container('tectonic') {
                      sh '''
                          remote_resume_checksum=$(curl -s https://www.kmontocam.com/files/resume-en.tex | sha256sum | awk '{print $1}')
                          local_resume_checksum=$(sha256sum ./files/resume-en.tex | awk '{print $1}')

                          if [ "$remote_resume_checksum" == "$local_resume_checksum" ]; then
                              echo "No changes in the resume, omitting compilation"
                          else
                              tectonic ./files/resume-en.tex
                          fi
                          '''
                }
            }
        }
        stage('UPLOAD TO S3') {
            steps {
                container('aws-cli') {
                    script {
                      withCredentials([ string(credentialsId: 'c4fa69ed-90d4-4a9d-9560-d1fd2b271d32', variable: 'AWS_CREDENTIALS') ]) {
                          def credentials = readJSON text: env.AWS_CREDENTIALS

                          withEnv([
                            "AWS_ACCESS_KEY_ID=${credentials.accessKeyId}",
                            "AWS_SECRET_ACCESS_KEY=${credentials.secretAccessKey}",
                            "AWS_DEFAULT_REGION=${credentials.region}"
                          ]) {
                            def buckets = ['kmontocam.com', 'www.kmontocam.com']
                            
                            buckets.each { bucket ->
                                sh """
                                    aws s3 cp index.html s3://${bucket} --acl public-read
                                    aws s3 cp --recursive assets/ s3://${bucket}/assets/ --acl public-read
                                    aws s3 cp --recursive files/ s3://${bucket}/files/ --acl public-read
                                    """
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
