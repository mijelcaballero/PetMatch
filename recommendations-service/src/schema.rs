use async_graphql::Object;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn recommendations(&self, user_id: String) -> Vec<String> {
        // Stub: generate placeholder recommendations
        vec![
            format!("rec1_for_{}", user_id),
            format!("rec2_for_{}", user_id),
            format!("rec3_for_{}", user_id),
        ]
    }
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn add_recommendation(&self, user_id: String, rec_id: String) -> bool {
        // Stub: pretend to store recommendation
        true
    }
}
