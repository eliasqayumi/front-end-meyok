# Final - Meyok - 

* 1. Veri tabanı (MySQL)
* 2. Back-end (Springboot)
* 3. Front-end (Angular)


***Back-end***

* Backend çalıştırmak için herhangi java derleyicini açabilirsiniz (IntelliJ IDEA),(Eclips),(NetBeans) vb.
* Dizin yolu
-- MEYOK FULL PROJECT
                    |
                    Backend
                        |
                        MEYOK    ***Bu klasörü direk yukarıdaki herhangi bir derleyiciye açınız***
**Backend Ayarlar**
* veritabanlar ilişki kurulması için ayarlar yapılması gerekiyor, aşağıdaki yolu izelere ayarlar yapılır
--MEYOK
    |
    src
        |
        main
            |
            resources
                    |
                    application.properties
                                        |
                                        ***Bu dosyayı açınız***
                         __________________________________________________________________________________________   
                        |                                                                                          |
                        |                                                                                          |
                        |    spring.datasource.url=jdbc:mysql://localhost:3306/MEYOK                               |
                        |    spring.datasource.username=***databaseuserName***                                     |
                        |    spring.datasource.password=***password***                                             |
                        |    spring.jpa.show-sql=true                                                              |
                        |    spring.jpa.hibernate.ddl-auto=update                                                  |
                        |    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect           |
                        |    ***Eğer Geçici veri taban kullanmak isityorsak bu kısmı komutsatırdan çıkarınız***    |
                        |    ***ve yukarıdakı kodu komut satıra dönüştürünüz ya siliniz***                         |
                        |    ***Komut satır, her satır başına # ekleyerek dönüştürebilirsibiz***                   |
                        |    #spring.mvc.view.prefix=/WEB-INF/JSP/                                                 |
                        |    #spring.mvc.view.suffix=.jsp                                                          |
                        |    #spring.h2.console.enabled=true                                                       |
                        |    #spring.datasource.platform=h2                                                        |
                        |    #spring.datasource.url=jdbc:h2:mem:navin                                              |
                        |                                                                                          |
                        |__________________________________________________________________________________________|

*** Sorna uygulamayı çalıştırınız***
--MEYOK
    |
    src
        |
        main
            |
            java
                |
                com
                    |
                    example
                            |
                            meyok
                                |
                                MeyokApplication.java ***Bu dosyayı açıp main metodu çalıştırınız***


***Front-end***
* Frontend çalıştırmak için herhangi bir derleyicini açabilirsiniz (IntelliJ IDEA),(VisualStudio Code),(Atom) vb.
* Dizin yolu
-- MEYOK FULL PROJECT
                    |
                    Frontend
                        |
                        meyok   ***Bu klasörü direk yukarıdaki herhangi bir derleyiciye açınız***


***Front-end çalıştırmak için aşağıdaki uygulamalar yüklü olması lazım***
* Node.js
* angular cli

 ***Frontend çalıştırmak için***
 * Herhangi bir derleyicinin terminelini ya da işletim sisteminin terminelini açarak
 * bu projenin dizinine gelin
 * Frontend/meyok   ***dizini***
    
    ***bu dizine olduğunuzdan emin olmak için pwd komutunu çalıştırın***
    * sonra ng serve komutu ile uygulamayı çalıştırınız
    * şimdi herhangi bir web tarayıcı kullanrak localhost:4200 url kısmında yazıp çalıştırınız
    