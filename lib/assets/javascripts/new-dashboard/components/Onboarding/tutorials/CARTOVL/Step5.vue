<template>
  <div class="u-width--100 u-pr--10 u-pl--10">
    <StepTitle :title="$t(`Wizards.cartovl.sections.summary`)">
      <template slot="icon">
          <img svg-inline src="../../../../assets/icons/onboarding/summary.svg"/>
      </template>
    </StepTitle>
    <p v-html="$t(`Wizards.cartovl.step5.summary`)" class="text is-body u-mb--64"></p>

    <StepTitle :title="$t(`Wizards.cartovl.sections.howto`)">
      <template slot="icon">
          <img svg-inline src="../../../../assets/icons/onboarding/howto.svg"/>
      </template>
    </StepTitle>
    <ol class="u-list__style--decimal u-list__position--inside">
      <li>
        <p v-html="$t(`Wizards.cartovl.step5.howto.instruction1`)" class="text is-caption u-inline"></p>
        <CodeBlock :code="codeBlock1"></CodeBlock>
      </li>
      <li>
        <p v-html="$t(`Wizards.cartovl.step5.howto.instruction2`)" class="text is-caption u-inline"></p>
        <CodeBlock :code="codeBlock2"></CodeBlock>
      </li>
    </ol>

    <StepTitle :title="$t(`Wizards.cartovl.sections.extras`)" class="u-mt--64">
      <template slot="icon">
          <img svg-inline src="../../../../assets/icons/onboarding/extras.svg"/>
      </template>
    </StepTitle>
    <p v-html="$t(`Wizards.cartovl.step5.extras.resource1`)" class="text is-caption u-mt--16 u-mb--64"></p>
  </div>
</template>
<script>
import CodeBlock from 'new-dashboard/components/Code/CodeBlock.vue';
import StepTitle from 'new-dashboard/components/Onboarding/components/StepTitle.vue';

export default {
  name: 'Step5',
  stepName: 'Add data layer',
  components: {
    CodeBlock,
    StepTitle
  },
  data () {
    return {
      codeBlock1,
      codeBlock2
    };
  }
};

// Code Blocks to be rendered in steps
const codeBlock1 =
`carto.setDefaultAuth({
  username: 'public',
  apiKey: 'default_public'
})`;

const codeBlock2 =
`const viz = new carto.Viz();
const source = new carto.source.Dataset('world_ports')
const layer = new carto.Layer('layer', source, viz);
layer.addTo(map);`;
</script>
