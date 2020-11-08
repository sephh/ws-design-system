# Wrapper

Nós poderíamos criar todos os componentes do zero, mas provavelmente estaríamos reinventando a roda. Ao invés disso é mais produtivo escolher uma biblioteca validada pela comunidade para ser a base da nossa lib.

Caso estejamos usando React ou Vue aconselho fortemente usar a estratégia de wrapper, caso precise mudar essa lib no futuro. É muito fácil no contexto desses dois Frameworks/Libs.

No React para ter um wrapper basta usar o operador rest nas propriedades e no caso so Vue basta usar o $listeners e $attrs. 

Se você estiver usando Angular, terá que criar todos os Inputs e Outputs de cada componente e seu wrapper. Não aconselho que isso seja feito. Na minha opinião é melhor se conformar com o casamento com a lib escolhida. 


## Modal

Como o nosso time gosta muito do Material, vamos adicioná-lo ao projeto e aproveitar o modal que já está construído, lá.

```
npm install @material-ui/core
```
