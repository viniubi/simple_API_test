/**
 * @swagger
 * components:
 *  schemas:
 *      Item:
 *          type: object
 *          required:
 *              - produto
 *              - preco
 *          properties:
 *              id:
 *                  type: number
 *              produto:
 *                  type: string
 *              preco:
 *                  type: number
 *          example:
 *              id: 1
 *              produto: camiseta
 *              preco: 30
 *      Item_input:
 *          type: object
 *          required:
 *              - produto
 *              - preco
 *          properties:
 *              produto:
 *                  type: string
 *              preco:
 *                  type: number
 *          example:
 *              produto: camiseta
 *              preco: 30
 * /catalogo:
 *  get:
 *      summary: Busca todos os itens no catalogo
 *      tags: [Catalogo]
 *      responses:
 *          200:
 *              description: Catalogo de produtos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              itens:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Item'
 *  post:
 *      summary: Cadastra novo item
 *      tags: [Catalogo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item_input'
 *      responses:
 *          201:
 *              description: Item cadastrado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              id:
 *                                  type: number
 *                          example:
 *                              message: "item adicionado ao catalogo com sucesso"
 *                              id: 1
 *          400:
 *              description: Body da requisição é inválido
 * /catalogo/{_id}:
 *  get:
 *      summary: Busca itens por ID
 *      tags: [Catalogo]
 *      parameters:
 *          - in: path
 *            name: _id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID do item
 *      responses:
 *          200:
 *              description: Item que pertence o ID buscado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item'
 *          404:
 *              description: Item não encontrado
 *  put:
 *      summary: Altera item já existente
 *      tags: [Catalogo]
 *      parameters:
 *          - in: path
 *            name: _id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID do item
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item_input'
 *      responses:
 *          200:
 *              description: Item modificado com sucesso
 *          400:
 *              description: Body da requisição é inválido, ou nenhuma alteração foi feita
 *          404:
 *              description: Item não encontrado
 *  delete:
 *      summary: Deleta item
 *      tags: [Catalogo]
 *      parameters:
 *          - in: path
 *            name: _id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID do item
 *      responses:
 *          200:
 *              description: Item deletado com sucesso
 *          404:
 *              description: Item não encontrado
 */