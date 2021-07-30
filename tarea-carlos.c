#include <stdio.h>

int main()
{   int n1, n2, i=0, cont=0,m=0, div=0, sum=0;
    printf("ingresa dos numeros\n");
    scanf("%d %d", &n1, &n2);
    if(n1<n2){
    for(i=n1; i<=n2; i++){
        cont=0;
        for (m=1; m<=n2; m++){
            div = i%m;
            if(div==0){
                cont++;
            }
        } printf("%d\n", cont);
        if(cont<3){
            sum+=i;
        }
    }
        printf(" sum : %d\n", sum);
    }
    return 0;
}