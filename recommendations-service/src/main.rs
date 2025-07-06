use actix_web::{guard, web, App, HttpResponse, HttpServer, Responder};
use async_graphql::{Schema, EmptySubscription};
use async_graphql_actix_web::{Request, Response};

mod schema;
use schema::{QueryRoot, MutationRoot};

async fn graphql_handler(schema: web::Data<Schema<QueryRoot, MutationRoot, EmptySubscription>>, req: Request) -> Response {
    schema.execute(req.into_inner()).await.into()
}

async fn health() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({"status":"OK","service":"recommendations-service"}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription).finish();

    println!("recommendations-service listening on 3014");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(schema.clone()))
            .service(web::resource("/").guard(guard::Post()).to(graphql_handler))
            .service(web::resource("/health").to(health))
    })
    .bind(("0.0.0.0", 3014))?
    .run()
    .await
}
